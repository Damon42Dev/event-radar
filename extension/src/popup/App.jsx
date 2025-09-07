import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { eventStore } from '../store/eventStore.js'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { createEvents } from 'ics'

const formatToGoogleDateTime = (dateStr, timeStr) => {
  // Expecting YYYY-MM-DD and HH:mm
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    const [hour = 0, minute = 0] = (timeStr || '00:00').split(':').map(Number)
    const start = new Date(Date.UTC(year, month - 1, day, hour, minute))
    const end = new Date(start.getTime() + 60 * 60 * 1000)
    const toParam = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '')
    return { start: toParam(start), end: toParam(end) }
  } catch (e) {
    return { start: '', end: '' }
  }
}

const App = observer(() => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    chrome.storage?.local.get(['events'], ({ events }) => {
      if (events) eventStore.setEvents(events)
      setLoading(false)
    })

    const listener = (message) => {
      if (message?.type === 'EVENTS_UPDATED') {
        eventStore.setEvents(message.payload || [])
      }
    }
    chrome.runtime?.onMessage.addListener(listener)
    return () => chrome.runtime?.onMessage.removeListener(listener)
  }, [])

  const handleExportICS = async () => {
    const icsEvents = eventStore.events.map((evt) => {
      const [y, m, d] = (evt.date || '1970-01-01').split('-').map(Number)
      const [hh = 0, mm = 0] = (evt.time || '00:00').split(':').map(Number)
      return {
        title: evt.title || 'Untitled Event',
        description: evt.description || '',
        location: evt.location || '',
        start: [y, m, d, hh, mm],
        duration: { hours: 1 }
      }
    })

    const { error, value } = createEvents(icsEvents)
    if (error) return

    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `events-${Date.now()}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleGoogleCalendar = () => {
    if (eventStore.events.length === 0) return
    const first = eventStore.events[0]
    const { start, end } = formatToGoogleDateTime(first.date, first.time)
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: first.title || 'Event',
      details: first.description || '',
      location: first.location || '',
      dates: `${start}/${end}`
    })
    const url = `https://calendar.google.com/calendar/render?${params.toString()}`
    window.open(url, '_blank')
  }

  const handleGenerateWebCal = () => {
    chrome.runtime?.sendMessage({ type: 'GENERATE_WEBCAL', payload: eventStore.events }, (resp) => {
      if (!resp?.ok) return alert(resp?.error || 'Failed to generate WebCal')
      const url = resp.webcal || (resp.url ? `http://localhost:3000${resp.url}` : '')
      if (url) {
        window.open(url, '_blank')
      } else {
        alert('No link returned')
      }
    })
  }

  return (
    <Container sx={{ width: 360, p: 0 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div">Web Event to Calendar</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        {loading ? (
          <Typography variant="body2">Loading...</Typography>
        ) : (
          <Grid container spacing={2}>
            {eventStore.events.map((evt, idx) => (
              <Grid item xs={12} key={idx}>
                <Card variant="outlined">
                  <CardHeader title={evt.title || 'Untitled Event'} subheader={`${evt.date || ''} ${evt.time || ''}`} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">地点：{evt.location || '-'}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{evt.description || ''}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 2, pb: 2 }}>
          <Button variant="contained" size="small" onClick={handleExportICS}>导出 ICS</Button>
          <Button variant="outlined" size="small" onClick={handleGenerateWebCal}>生成 WebCal 链接</Button>
          <Button variant="outlined" size="small" onClick={handleGoogleCalendar}>添加到 Google Calendar</Button>
        </Stack>
      </Container>
    </Container>
  )
})

export default App


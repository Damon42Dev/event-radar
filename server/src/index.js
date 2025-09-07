import express from 'express'
import { createEvents } from 'ics'
import { nanoid } from 'nanoid'

const app = express()
app.use(express.json({ limit: '1mb' }))

const storage = new Map()

app.post('/generate-ics', (req, res) => {
  const eventsInput = Array.isArray(req.body) ? req.body : req.body?.events || []
  const icsEvents = eventsInput.map((evt) => {
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
  if (error) return res.status(400).json({ error: error.message || 'ICS error' })
  const id = nanoid(10)
  storage.set(id, value)
  return res.json({ id, url: `/calendar/${id}.ics`, webcal: `webcal://localhost:3000/calendar/${id}.ics` })
})

app.get('/calendar/:id.ics', (req, res) => {
  const id = req.params.id.replace(/\.ics$/, '')
  const ics = storage.get(id)
  if (!ics) return res.status(404).send('Not found')
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="${id}.ics"`)
  return res.send(ics)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`WebCal server listening on http://localhost:${port}`)
})


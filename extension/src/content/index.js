(() => {
  const textContent = document.body?.innerText || ''

  // Simple regex patterns (heuristic)
  const dateRegex = /(20\d{2})[-/.](0?[1-9]|1[0-2])[-/.](0?[1-9]|[12]\d|3[01])/i
  const timeRegex = /\b([01]?\d|2[0-3]):([0-5]\d)\b/
  const titleRegex = /(event|meeting|conference|concert|webinar|讲座|会议|活动|音乐会)[:\-\s]+(.{3,80})/i
  const locationRegex = /(location|address|地点)[:\-\s]+(.{3,80})/i

  const lines = textContent.split(/\n+/)
  const events = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const dateMatch = line.match(dateRegex)
    const timeMatch = line.match(timeRegex)
    if (dateMatch || timeMatch) {
      // Search nearby lines for title and location
      const context = [lines[i - 1] || '', line, lines[i + 1] || ''].join(' \n ')
      const tMatch = context.match(titleRegex)
      const lMatch = context.match(locationRegex)

      const year = (dateMatch && dateMatch[1]) || new Date().getFullYear()
      const month = (dateMatch && dateMatch[2]) || '01'
      const day = (dateMatch && dateMatch[3]) || '01'
      const date = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const time = timeMatch ? `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}` : '00:00'

      const title = tMatch ? (tMatch[2] || tMatch[1]).trim() : document.title.slice(0, 80)
      const location = lMatch ? (lMatch[2] || '').trim() : ''
      const description = context.slice(0, 200)

      events.push({ title, date, time, location, description })
    }
  }

  if (events.length > 0) {
    chrome.runtime?.sendMessage({ type: 'CONTENT_EVENTS', payload: events })
  }
})()


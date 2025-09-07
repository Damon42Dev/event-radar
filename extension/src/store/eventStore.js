import { makeAutoObservable } from 'mobx'

class EventStore {
  events = []

  constructor() {
    makeAutoObservable(this)
  }

  setEvents(events) {
    this.events = Array.isArray(events) ? events : []
  }

  addEvent(event) {
    this.events.push(event)
  }

  updateEvent(index, updatedEvent) {
    if (index >= 0 && index < this.events.length) {
      this.events[index] = { ...this.events[index], ...updatedEvent }
    }
  }

  clearEvents() {
    this.events = []
  }
}

export const eventStore = new EventStore()


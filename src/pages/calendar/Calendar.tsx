import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { enUS } from 'date-fns/locale/en-US'
import './Calendar.css'
import { useEffect, useState } from 'react'
import getEvents from '../../api/EventsApi'
import { Event } from '../../models/Event'
import EventCard from '../../components/EventCard'

const locales = {
  'en-US': enUS
}




const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const eventsToDisplay = events.map((event: Event) => {
    return {
      title: event.category.name || "Untitled Event",
      start: new Date(event.date),
      end: new Date(new Date(event.date).setHours(new Date(event.date).getHours() + event.duration)),
      resource: event // Store the original event data
    }
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event.resource);
  };

  return (
    <div style={{ display: 'flex', margin: 30, height: 'calc(100vh - 60px)' }}>
      {/* Events List */}
      <div style={{ width: '400px', padding: '20px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <h2>Events</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              selected={selectedEvent?._id}
              onSelect={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <Calendar
          localizer={localizer}
          events={eventsToDisplay}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          className="responsive-calendar"
          onSelectEvent={handleSelectEvent}
          selected={selectedEvent ? [selectedEvent] : []}
        />
      </div>
    </div>
  )
}

export default MyCalendar

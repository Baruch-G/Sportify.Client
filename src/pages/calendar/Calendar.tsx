import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { enUS } from 'date-fns/locale/en-US'
import './Calendar.css'
import { useEffect, useState } from 'react'
import getEvents from '../../api/EventsApi'
import { Event } from '../../models/Event'

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

  const eventsToDisplay = events.map((event: Event) => {
    return {
      title: "", // event.category,
      start: new Date(event.date),
      end: new Date(new Date(event.date).setHours(new Date(event.date).getHours() + event.duration))
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

  console.log('events', events)

  return (
    <div style={{ margin: 30, height: 'calc(100vh - 60px)' }}>
      <Calendar
        localizer={localizer}
        events={eventsToDisplay}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        className="responsive-calendar"
      />
    </div>
  )
}

export default MyCalendar

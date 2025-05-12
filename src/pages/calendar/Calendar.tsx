import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays, subDays } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { enUS } from 'date-fns/locale/en-US'
import './Calendar.css'
import { useEffect, useState, useRef } from 'react'
import getEvents from '../../api/EventsApi'
import { Event } from '../../models/Event'
import EventCard from '../../components/EventCard/EventCard'
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [date, setDate] = useState(new Date());
  const selectedEventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const eventsToDisplay = events.map((event: Event) => {
    return {
      title: event.category.name || "Untitled Event",
      start: new Date(event.date),
      end: new Date(new Date(event.date).setHours(new Date(event.date).getHours() + event.duration)),
      resource: event,
      selected: selectedEvent?._id === event._id
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

  useEffect(() => {
    if (selectedEvent && selectedEventRef.current) {
      selectedEventRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedEvent]);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event.resource);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: string) => {
    // Reset to current date when changing views
    setDate(new Date());
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      margin: isMobile ? '16px' : '30px', 
      height: isMobile ? 'auto' : 'calc(100vh - 60px)',
      gap: isMobile ? '20px' : '0'
    }}>
      {/* Events List - Only show on desktop or when an event is selected on mobile */}
      {(!isMobile || selectedEvent) && (
        <div style={{ 
          width: isMobile ? '100%' : '400px', 
          padding: '20px', 
          borderRight: isMobile ? 'none' : '1px solid #ddd',
          borderBottom: isMobile ? '1px solid #ddd' : 'none',
          overflowY: 'auto',
          maxHeight: isMobile ? '300px' : 'none'
        }}>
          <h2 style={{ 
            marginBottom: '20px',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>Events</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isMobile ? (
              // On mobile, only show the selected event
              selectedEvent && (
                <div ref={selectedEventRef}>
                  <EventCard
                    event={selectedEvent}
                    selected={selectedEvent?._id === selectedEvent._id}
                    onSelect={() => setSelectedEvent(null)}
                  />
                </div>
              )
            ) : (
              // On desktop, show all events
              events.map((event) => (
                <div key={event._id} ref={selectedEvent?._id === event._id ? selectedEventRef : null}>
                  <EventCard
                    event={event}
                    selected={selectedEvent?._id === event._id}
                    onSelect={() => setSelectedEvent(event)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Calendar */}
      <div style={{ 
        flex: 1, 
        marginLeft: isMobile ? '0' : '20px',
        height: isMobile ? '500px' : '100%'
      }}>
        <Calendar
          localizer={localizer}
          events={eventsToDisplay}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          className="responsive-calendar"
          onSelectEvent={handleSelectEvent}
          selected={selectedEvent ? [selectedEvent] : []}
          eventPropGetter={(event) => {
            const categoryColor = event.resource.category.color;
            return {
              className: event.selected ? 'selected-event' : '',
              style: {
                '--event-color': categoryColor,
                backgroundColor: event.selected ? categoryColor : 'transparent',
                borderColor: categoryColor,
                color: event.selected ? 'white' : categoryColor,
              } as React.CSSProperties
            }
          }}
          views={isMobile ? ['week', 'day'] : ['month', 'week', 'day']}
          defaultView={isMobile ? 'week' : 'month'}
          date={date}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          popup
          selectable
        />
      </div>
    </div>
  )
}

export default MyCalendar

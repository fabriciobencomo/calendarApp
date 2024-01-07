import { Calendar } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, Navbar, CalendarModal } from "../index"
import { FabAddNew
 } from '../components/FabAddNew'
import { localizer, getMessagesEs } from '../../helpers/'
import { useEffect, useState } from 'react'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'
import { FabDelete } from '../components/FabDelete'



export const CalendarPage = () => {

  const {user} = useAuthStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const {openDateModal} = useUiStore()
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setlastView(event)
  }

  useEffect(()=>{
    startLoadingEvents()
  },[])

  const eventStyleGetter = (e, start, end, isSelected) => {
    const isMyEvent = ((user.uid === e.user._id) || (user.uid === e.user.uid))
    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

  

    return {
      style
    }
  }

  

  return (
    <>
      <Navbar></Navbar>
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView={lastView}
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesEs()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
      />
      <CalendarModal></CalendarModal>
      <FabAddNew></FabAddNew>
      <FabDelete></FabDelete>
    </>
  )
}

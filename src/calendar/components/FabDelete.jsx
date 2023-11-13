import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { addHours } from 'date-fns'
import { useDispatch } from 'react-redux'

export const FabDelete = () => {

    const {startDeletingEvent, hasEventSelected} = useCalendarStore()
    
    const handleNewClick = () => {
      startDeletingEvent()
    }
  return (
    <button className='btn btn-danger fab-danger' onClick={handleNewClick} style={{display: hasEventSelected ? '' : 'none'}}>
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}

import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { onSetActiveEvent } from '../../store'
import { addHours } from 'date-fns'
import { useSelector } from 'react-redux'

export const FabAddNew = () => {

    const {openDateModal} = useUiStore()
    const { setActiveEvent } = useCalendarStore()
    const {user} = useSelector(state => state.auth)
    
    const handleNewClick = () => {
        setActiveEvent({
            //_id: new Date().getTime(),
            title: 'hola',
            notes: 'mundo',
            start: new Date(),
            end: addHours(new Date, 2),
            bgColor: '#fafafa',
            user: {
              ...user
            }
        })
        openDateModal()
    }
  return (
    <button className='btn btn-primary fab' onClick={handleNewClick}>
        <i className='fas fa-plus'></i>
    </button>
  )
}

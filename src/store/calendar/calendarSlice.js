import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const event = {
        _id: new Date().getTime(),
        title: 'hola',
        notes: 'comprar algo',
        start: new Date(),
        end: addHours(new Date, 2),
        bgColor: '#fafafa',
        user: {
          _id: 123,
          name: 'fabricio'
        }
}

export const calendarSlice = createSlice({
        name: 'calendar',
        initialState: {
                events: [event],
                activeEvent: null
        },
        reducers: {
                onSetActiveEvent: (state, {payload}) => {
                        state.activeEvent = payload
                },
        }
});
export const { onSetActiveEvent } = calendarSlice.actions;
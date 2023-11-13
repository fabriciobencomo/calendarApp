import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const {activeEvent, startSavingEvent} = useCalendarStore()

  const { isDateModalOpen, closeDateModal } = useUiStore()

  const [formSubmmited, setformSubmmited] = useState(false)

  const onInputChange = ({target}) => {
    setformValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const [startDate, setStartDate] = useState(new Date());

  const [formValues, setformValues] = useState({
    title: 'fernando',
    notes: 'holas',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const titleClass = useMemo(() => {
    if(!formSubmmited) return ''

    return (formValues.title.length > 0) ? '' : 'is-invalid'

  }, [formValues.title, formSubmmited])

  useEffect(() => {
    if(activeEvent !== null){
      setformValues({...activeEvent})
    }
  }, [activeEvent])
  

  const onDateChange = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event
    })
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    setformSubmmited(true)
    const difference = differenceInSeconds(formValues.end, formValues.start)
    if(isNaN(difference) || difference <= 0){
      Swal.fire('Fechas Incorrectas', 'Revisar fechas ingresadas', 'error')
      return 
    }
    if(formValues.title.length <= 0) return
    await startSavingEvent(formValues)
    closeDateModal()
    setformSubmmited(false)
  }

  return (
    <Modal         
    isOpen={isDateModalOpen}
    onRequestClose={onCloseModal}
    style={customStyles}
    className='modal'
    overlayClassName='modal-fondo'
    closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

          <div className="form-group mb-2">
              <label>Fecha y hora inicio</label>
              <DatePicker locale='es' selected={formValues.start} className='form-control' onChange={(e) => onDateChange(e,'start')} dateFormat='Pp' showTimeSelect timeCaption='Hora'></DatePicker>
          </div>

          <div className="form-group mb-2">
              <label>Fecha y hora fin</label>
              <DatePicker locale='es' minDate={formValues.start} selected={formValues.end} className='form-control' onChange={(e) => onDateChange(e,'end')} dateFormat='Pp' showTimeSelect timeCaption='Hora'></DatePicker>
          </div>
          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValues.title}
                  onChange={onInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>
    </Modal>
  )
}

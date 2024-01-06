import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage  } from '../calendar'
import { getEnvVariables } from '../helpers'
import { useAuthStore } from '../hooks'
import { useEffect } from 'react'

export const AppRouter = () => {

  const {status, checkAuthStatus} = useAuthStore()

  useEffect(()=>{
    checkAuthStatus()
  }, [])

  if(status === 'checking'){
    return( <h1>Cargando</h1> )
  }

  return (
    <Routes>
          {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <CalendarPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }
    </Routes>
  )
}

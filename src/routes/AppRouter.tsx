import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthApi } from '../apps/auth/hook/useAuthApi'
import { Auth, UserProfile } from '../apps/auth/pages';
import { 
  Home, UsersManagament, RolesManagement,
  RoleCreate, RoleEdit, RolePage,
  CreateUser, EditUser
} from '../apps/user_management/pages';
import {
  HomeUbicacion, BloquePage, UbicacionPage
} from '../apps/incidentes-admin/pages/ubicacion'
import { Error } from '../shared';
import Swal from 'sweetalert2';
import { IStoreRedux } from '../store'
import { IncidentePage, IncidenteSelectPage } from '../apps/incidentes-admin/pages/incidentes';

import IncidenteClient from '../apps/incidentes-client/pages/IncidenteClient/IncidenteClient'
import IncidenteClientUpdate from '../apps/incidentes-client/pages/IncidenteClientUpdate/IncidenteClientUpdate'
import IncidenteClientCreate from '../apps/incidentes-client/pages/IncidenteClientCreate/IncidenteClientCreate'
import IncidenteClientSelect from '../apps/incidentes-client/pages/IncidenteClientSelect'

export const AppRouter = () => {
  const { user } = useSelector((state: IStoreRedux) => state.auth);
  const { logout, setUserAndOptions } = useAuthApi();
  const authLocal: string = localStorage.getItem('stateAuth') || 'not-authenticated';
  const endDate: number | undefined = localStorage.getItem('token-expire-date') === null ? undefined : parseInt(localStorage.getItem('token-expire-date')!);

  useEffect(() => {
    if (user.email === undefined && endDate && new Date().getTime() < endDate) {
      setUserAndOptions();
    } else if (endDate && new Date().getTime() > endDate) {
      Swal.fire({
        icon: 'error',
        title: 'El token a expirado debe loguearse de nuevo',
        text: 'Redireccionandolo al login.'
      })
      logout();
    }
  }, )

  return (
    <Routes>
      {
        authLocal === 'authenticated' ? (
          <>
            <Route path='/user-management/home' element={ <Home /> }/>
            <Route path='/user-management/users' element={ <UsersManagament /> }/>
            <Route path='/user-management/users/:id' element={ <EditUser /> } />
            <Route path='/user-management/users/create' element={ <CreateUser /> } />
            <Route path='/user-management/roles' element={ <RolesManagement /> }/>
            <Route path='/user-management/roles/:id' element={ <RolePage /> }/>
            <Route path='/user-management/roles/create' element={ <RoleCreate /> }/>
            <Route path='/user-management/roles/edit/:id' element={ <RoleEdit /> }/>
            <Route path='/user-management/profile' element={ <UserProfile /> }/>
            
            <Route path='/incidentes/ubicacion' element={ <HomeUbicacion /> } />
            <Route path='/incidentes/ubicacion/bloques' element={ <BloquePage /> } />
            <Route path='/incidentes/ubicacion/departamento' element={ <UbicacionPage /> } />
            <Route path='/incidentes/' element={ <IncidentePage /> } />
            <Route path='/incidentes/:id' element={ <IncidenteSelectPage /> } />

            <Route path='/incidentes/client' element={ <IncidenteClient /> } />
            <Route path='/incidentes/client/create' element={ <IncidenteClientCreate /> } />
            <Route path='/incidentes/client/update/:id' element={ <IncidenteClientUpdate /> } />
            <Route path='/incidentes/client/:id' element={ <IncidenteClientSelect /> } />
          </>
        ) : (
          <Route path='/login' element={ <Auth /> } />
        )
      }      
      <Route path='/*' element={ <Error /> }/>
      <Route path='/' element={ <Auth /> }/>
      <Route path='/login' element={ <Auth /> } />
    </Routes>
  )
}

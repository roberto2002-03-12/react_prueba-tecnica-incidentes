import userManagementApi from '../../../api/user-management.api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { 
  onLoadIncidente, onLoadedIncidente, onLoadedIncidentes
} from '../../../store/incidente/incidenteSlice'
import { useErrorHandler } from '../../../hooks'

import {
  IIncidenteQuery,
  IncidenteEstadoType
} from '../models'
import { AxiosError } from 'axios'

export const useIncidentesApi = () => {
  const dispatch = useDispatch();
  const errorManage = useErrorHandler();
  const navigate = useNavigate();

  // peticiones lado admin
  const getAllIncidenteAdmi = async (dataInputs: IIncidenteQuery) => {
    dispatch(onLoadIncidente())
    try {
      const url: string = `/incidente?page=`
      + (dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1')
      + (dataInputs !== undefined && dataInputs.estado !== undefined && dataInputs.estado !== '' ? `&estado=${dataInputs.estado}` : '')
      + (dataInputs !== undefined && dataInputs.bloqueId !== undefined && dataInputs.bloqueId !== 0 ? `&bloqueId=${dataInputs.bloqueId}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtStart !== undefined && dataInputs.createdAtStart !== '' && dataInputs.createdAtStart !== null ? `&createdAtStart=${dataInputs.createdAtStart}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtEnd !== undefined && dataInputs.createdAtEnd !== '' && dataInputs.createdAtEnd !== null ? `&createdAtEnd=${dataInputs.createdAtEnd}` : '')

      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedIncidentes(data))
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/user-management/home');
      }
    }
  }

  const getOneIncidenteAdmi = async (incidenteId: number) => {
    dispatch(onLoadIncidente())
    try {
      const { data } = await userManagementApi.get(`/incidente/${incidenteId}`);
      dispatch(onLoadedIncidente(data))
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/user-management/home');
      }
    }
  }

  const putOneIncidenteAdmi = async (incidenteId: number, estado: IncidenteEstadoType) => {
    dispatch(onLoadIncidente())
    try {
      const { data } = await userManagementApi.put(`/incidente/${incidenteId}`, {
        estado
      });
      navigate('/incidentes/');
      dispatch(onLoadedIncidente(data))
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/user-management/home');
      }
    }
  }

  // peticiones lado cliente


  return {
    getAllIncidenteAdmi,
    getOneIncidenteAdmi,
    putOneIncidenteAdmi
  }
}
import userManagementApi from '../../../api/user-management.api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { 
  onDeleteIncidente,
  onLoadIncidente, onLoadedIncidente, onLoadedIncidentes,
  onSetFinishedLoad
} from '../../../store/incidente/incidenteSlice'
import { useErrorHandler } from '../../../hooks'

import {
  IIncidenteQuery,
  IncidenteEstadoType,
  IncidenteInputProps,
  IncidenteUpdateProps
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

  const getAllIncidenteClient = async (dataInputs: IIncidenteQuery) => {
    dispatch(onLoadIncidente())
    try {
      const url: string = `/incidente/client/all?page=`
      + (dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1')
      + (dataInputs !== undefined && dataInputs.estado !== undefined && dataInputs.estado !== '' ? `&estado=${dataInputs.estado}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtStart !== undefined && dataInputs.createdAtStart !== '' && dataInputs.createdAtStart !== null ? `&createdAtStart=${dataInputs.createdAtStart}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtEnd !== undefined && dataInputs.createdAtEnd !== '' && dataInputs.createdAtEnd !== null ? `&createdAtEnd=${dataInputs.createdAtEnd}` : '')

      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedIncidentes(data))
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/incidentes/client',
          navigateError404: '/incidentes/client'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/incidentes/client');
      }
    }
  }

  const getOneIncidenteClient = async (incidenteId: number) => {
    dispatch(onLoadIncidente())
    try {
      const { data } = await userManagementApi.get(`/incidente/client/${incidenteId}`);
      dispatch(onLoadedIncidente(data))
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/incidentes/client',
          navigateError404: '/incidentes/client'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/incidentes/client');
      }
    }
  }

  const createIncidenteClient = async (incidente: IncidenteInputProps, imagen: FileList | null) => {
    dispatch(onLoadIncidente())
    try {
      const data: IncidenteInputProps = {
        asunto: incidente.asunto,
        detalle: incidente.detalle
      };

      const formData = new FormData();

      if (incidente.bloqueId !== undefined && incidente.bloqueId !== '' ) data.bloqueId = incidente.bloqueId
      if (incidente.departamentoId !== undefined && incidente.departamentoId !== '') data.departamentoId = incidente.departamentoId
    
      const objJsonString = JSON.stringify(data);

      if (imagen && imagen !== null) {
        Array.from(imagen).forEach((file) => {
          formData.append('foto', file);
        });
      }

      formData.append('jsonStringify', objJsonString);

      await userManagementApi.post('/incidente/client', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      navigate('/incidentes/client');
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/incidentes/client',
          navigateError404: '/incidentes/client'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/incidentes/client');
      }
    }
  }

  const deleteIncidenteClient = async (id: number) => {
    dispatch(onLoadIncidente())
    try {
      await userManagementApi.delete(`/incidente/client/${id}`)
      dispatch(onDeleteIncidente(id));
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/incidentes/client',
          navigateError404: '/incidentes/client'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/incidentes/client');
      }
    }
  }

  const updateIncidenteClient = async (id: number, incidente: IncidenteUpdateProps) => {
    dispatch(onLoadIncidente())
    try {
      const data: IncidenteUpdateProps = {
        ...incidente
      }

      if (incidente.bloqueId !== undefined && incidente.bloqueId !== '' ) data.bloqueId = incidente.bloqueId
      if (incidente.departamentoId !== undefined && incidente.departamentoId !== '') data.departamentoId = incidente.departamentoId
      
      await userManagementApi.put(`/incidente/client/${id}`, incidente)
      dispatch(onSetFinishedLoad());
      navigate('/incidentes/client')
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/incidentes/client',
          navigateError404: '/incidentes/client'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar',
          text: 'Un extraño error acaba de suceder'
        })
        navigate('/incidentes/client');
      }
    }
  }


  return {
    getAllIncidenteAdmi,
    getOneIncidenteAdmi,
    putOneIncidenteAdmi,

    // cliente
    getAllIncidenteClient,
    getOneIncidenteClient,
    createIncidenteClient,
    deleteIncidenteClient,
    updateIncidenteClient
  }
}
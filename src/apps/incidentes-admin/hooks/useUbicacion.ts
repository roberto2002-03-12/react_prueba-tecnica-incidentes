import userManagementApi from '../../../api/user-management.api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { 
  onLoadDataBloques, onLoadDataDepartamentos,
  onLoadedDataBloqueSelect, onLoadedDataDepartamentoSelect,
  onLoadedDataBloques, onLoadedDataDepartamentos,
  onDeleteDataBloque, onDeleteDataDepartamento
} from '../../../store/ubicacion'
import { useErrorHandler } from '../../../hooks'

import {
  BloqueInputProps, DepartamentoInputProps,
  IPagenation
} from '../models'
import { AxiosError } from 'axios'

export const useUbicacionApi = () => {
  const dispatch = useDispatch();
  const errorManage = useErrorHandler();
  const navigate = useNavigate();

  const getBloques = async (dataInputs: IPagenation) => {
    dispatch(onLoadDataBloques())
    try {
      const url = `/ubicacion/bloque?page=`+(dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1');
      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedDataBloques(data));
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

  const getBloquesSelect = async () => {
    try {
      const { data } = await userManagementApi.get('/ubicacion/bloque/select');
      dispatch(onLoadedDataBloqueSelect(data))
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

  const getDepartamentos = async (dataInputs: IPagenation) => {
    dispatch(onLoadDataDepartamentos())
    try {
      const url = `/ubicacion/departamento?page=`+(dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1');
      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedDataDepartamentos(data));
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

  const getDepartamentoSelect = async () => {
    try {
      const { data } = await userManagementApi.get('/ubicacion/departamento/select');
      dispatch(onLoadedDataDepartamentoSelect(data))
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

  const postBloque = async (dataInputs: BloqueInputProps) => {
    dispatch(onLoadDataBloques())
    try {
      await userManagementApi.post('/ubicacion/bloque', dataInputs)
      Swal.fire({
        icon: 'success',
        title: 'Se agrego el nuevo bloque'
      })
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

  const postDepartamento = async (dataInputs: DepartamentoInputProps) => {
    dispatch(onLoadDataDepartamentos())
    try {
      await userManagementApi.post('/ubicacion/departamento', dataInputs)
      Swal.fire({
        icon: 'success',
        title: 'Se agrego el nuevo bloque'
      });
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

  const deleteBloque = async (bloqueId: number) => {
    dispatch(onLoadDataBloques())
    try {
      await userManagementApi.delete(`/ubicacion/bloque/${bloqueId}`)
      dispatch(onDeleteDataBloque(bloqueId));
      Swal.fire({
        icon: 'success',
        title: 'Se eliminó el bloque correctamente'
      })
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

  const deleteDepartamento = async (departamentoId: number) => {
    dispatch(onLoadDataDepartamentos())
    try {
      await userManagementApi.delete(`/ubicacion/departamento/${departamentoId}`)
      dispatch(onDeleteDataDepartamento(departamentoId));
      Swal.fire({
        icon: 'success',
        title: 'Se eliminó el departamento correctamente'
      })
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

  return {
    postDepartamento,
    postBloque,
    getBloques,
    getDepartamentos,
    getBloquesSelect,
    getDepartamentoSelect,
    deleteBloque,
    deleteDepartamento
  }
}
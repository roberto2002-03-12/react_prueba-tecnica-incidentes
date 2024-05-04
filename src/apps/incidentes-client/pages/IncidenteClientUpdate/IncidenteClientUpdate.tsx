import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useUbicacionApi } from '../../../incidentes-admin/hooks/useUbicacion';
import { useIncidentesApi } from '../../../incidentes-admin/hooks/useIncidente';
import { Layout } from '../../components'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { TextFieldWithHookForm } from '../../../user_management/components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../styles/CreateIncidenteStyle.css'
import { IncidenteUpdateProps } from '../../../incidentes-admin/models';
import { IStoreRedux } from '../../../../store';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const inputStyle = {
  width: '300px',
  marginLeft: '15px',
  marginRight: '15px',
  marginBottom: '10px'
}

const iconStyle = {
  position: 'absolute',
  left: 0,
  marginTop: '10px',
  marginLeft: '10px',
  cursor: 'pointer',
  '@media (max-width: 578px)': {
    marginTop: '20px'
  }
}

const IncidenteClientUpdate = () => {
  const [closeButton, setCloseButton] = useState(false);
  const { bloqueSelect, departamentoSelect } = useSelector((value: IStoreRedux) => value.ubicacion);
  const { incidente } = useSelector((value: IStoreRedux) => value.incidentes);
  const { id } = useParams();
  const { getBloquesSelect, getDepartamentoSelect } = useUbicacionApi()
  const { getOneIncidenteClient, updateIncidenteClient } = useIncidentesApi();
  const navigate = useNavigate()

  useEffect(() => {
    getBloquesSelect()
    getDepartamentoSelect()
    getOneIncidenteClient(parseInt(id!))
  }, []);

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    control
  } = useForm<IncidenteUpdateProps>()

  const onSubmit: SubmitHandler<IncidenteUpdateProps> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (data.departamentoId === '' && data.bloqueId === '') {
      Swal.fire({
        icon: 'error',
        title: 'Debe declarar por lo menos bloque o departamento'
      })

      return;
    }
    setCloseButton(true)
    updateIncidenteClient(parseInt(id!), data)
    reset();
  }

  return (
    <Layout>
      <ArrowBackIcon
        sx={iconStyle}
        onClick={() => navigate('/incidentes/client')}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='incidente-create'>
        <h2>Reportar incidencia</h2>
        <TextFieldWithHookForm
          control={control}
          name='asunto'
          label='Asunto'
          defaultValue={incidente.asunto}
          disabled={true}
          sx={inputStyle}
        />

        <TextFieldWithHookForm
          control={control}
          name='detalle'
          label='Detalle'
          defaultValue={incidente.detalle}
          multiline
          rows={5}
          error={errors.detalle && isSubmitted}
          helperText={errors.detalle && isSubmitted ? errors.detalle.message : ''}
          sx={inputStyle}
          rules={{
            minLength: {
              value: 15,
              message: 'Minimo 15 caracteres'
            },
            maxLength: {
              value: 255,
              message: 'Máximo 255 caracteres'
            }
          }}
        />

        <FormControl
          variant='outlined'
          sx={inputStyle}
        >
          <InputLabel id="role-type">Departamento</InputLabel>
          <Controller
            name="departamentoId"
            control={control}
            defaultValue={incidente.departamentoId}
            render={({ field }) => (
              <Select
                labelId="role-type"
                id="role-type"
                label="Estado"
                {...field}
                sx={{ width: '300px' }}
              >
                {
                  departamentoSelect.map(val => <MenuItem key={val.id} value={val.id}>{val.nroDepartamento}</MenuItem>)
                }
                <MenuItem sx={{ display: 'none' }} value={0}></MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl
          variant='outlined'
          sx={inputStyle}
        >
          <InputLabel id="role-type">Bloque</InputLabel>
          <Controller
            name="bloqueId"
            control={control}
            defaultValue={incidente.bloqueId}
            render={({ field }) => (
              <Select
                labelId="role-type"
                id="role-type"
                label="Estado"
                {...field}
                sx={{ width: '300px' }}
              >
                {
                  bloqueSelect.map(val => <MenuItem key={val.id} value={val.id}>{val.nroBloque}</MenuItem>)
                }
              </Select>
            )}
          />
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          disabled={closeButton}
        >
          Subir
        </Button>
      </form>
    </Layout>
  )
}

export default IncidenteClientUpdate
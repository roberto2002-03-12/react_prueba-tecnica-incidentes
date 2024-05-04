import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useUbicacionApi } from '../../../incidentes-admin/hooks/useUbicacion';
import { useIncidentesApi } from '../../../incidentes-admin/hooks/useIncidente';
import { Layout } from '../../components'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../styles/CreateIncidenteStyle.css'
import { IncidenteInputProps } from '../../../incidentes-admin/models';
import { IStoreRedux } from '../../../../store';
import Swal from 'sweetalert2';

const inputStyle = {
  width: '300px',
  marginLeft: '15px',
  marginRight: '15px',
  marginBottom: '10px'
}

const IncidenteClientCreate = () => {
  const [ closeButton, setCloseButton ] = useState(false);
  const { bloqueSelect, departamentoSelect } = useSelector((value: IStoreRedux) => value.ubicacion);

  const { getBloquesSelect, getDepartamentoSelect } = useUbicacionApi()
  const { createIncidenteClient } = useIncidentesApi();

  useEffect(() => {
    getBloquesSelect()
    getDepartamentoSelect()
  }, []);

  // const [files, setFiles] = useState<FileList | null>()
  const filesRef = useRef<FileList | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    control
  } = useForm<IncidenteInputProps>()


  const handleUploadImages = (event: React.ChangeEvent<HTMLInputElement>) =>
    filesRef.current = event.target.files

  const onSubmit: SubmitHandler<IncidenteInputProps> = (data) => {
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
    setCloseButton(true);
    const savedFiles = filesRef.current;
    createIncidenteClient(data, savedFiles)
    reset();
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className='incidente-create'>
        <h2>Reportar incidencia</h2>
        <TextField
          error={errors.asunto && isSubmitted}
          helperText={errors.asunto && isSubmitted ? errors.asunto.message : ''}
          {
          ...register(
            'asunto',
            {
              required: 'Requerido',
              minLength: {
                value: 5,
                message: 'Minimo 5 caracteres'
              },
              maxLength: {
                value: 45,
                message: 'Máximo 45 caracteres'
              }
            }
          )
          }
          style={inputStyle}
          type='text'
          label='Asunto'
          variant='outlined'
          placeholder='No hay agua'
        />

        <TextField
          error={errors.detalle && isSubmitted}
          helperText={errors.detalle && isSubmitted ? errors.detalle.message : ''}
          {
          ...register(
            'detalle',
            {
              required: 'Requerido',
              minLength: {
                value: 15,
                message: 'Minimo 15 caracteres'
              },
              maxLength: {
                value: 255,
                message: 'Máximo 255 caracteres'
              }
            }
          )
          }
          style={inputStyle}
          type='text'
          label='Detalle'
          multiline
          rows={5}
          variant='outlined'
          placeholder='No hay agua'
        />

        <FormControl
          variant='outlined'
          sx={inputStyle}
        >
          <InputLabel id="role-type">Departamento</InputLabel>
          <Controller
            name="departamentoId"
            control={control}
            defaultValue={''}
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
            defaultValue=""
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

        <div style={{width: '300px', marginBottom: '20px'}}>
          <label htmlFor="formFileMultiple" className="form-label">{`Fotos (opcional)`}</label>
          <input 
            className="form-control" 
            type="file" 
            id="formFileMultiple" 
            multiple
            onChange={handleUploadImages}
            accept='image/*'
          />
        </div>

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

export default IncidenteClientCreate
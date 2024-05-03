import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useIncidentesApi } from '../../hooks/useIncidente'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SmallLoading } from '../../../../shared';
import { ImageGallary, Layout } from '../../components';

import '../../styles/incidentes/IncidenteSelectStye.css'
import { IStoreRedux } from '../../../../store'
import { IIncidente } from '../../models';
import { Button } from '@mui/material';

const inputStyle = {
  width: '200px'
};

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

export const IncidenteSelectPage = () => {
  // data
  const { incidente, loadingStateIncidente } = useSelector((store: IStoreRedux) => store.incidentes)

  // navegacion
  const navigate = useNavigate();

  // peticiones
  const { getOneIncidenteAdmi, putOneIncidenteAdmi } = useIncidentesApi()

  // param
  const { id } = useParams();

  // form
  const { control, handleSubmit } = useForm<IIncidente>({
    defaultValues: {
      asunto: incidente.estado
    }
  })
  const onSubmit: SubmitHandler<IIncidente> = (data) =>
    putOneIncidenteAdmi(incidente.id, data.estado);

  useEffect(() => {
    getOneIncidenteAdmi(parseInt(id ?? '1'))
  }, [id]);

  return (
    <Layout>
      {
        loadingStateIncidente === 'loading' ? (
          <SmallLoading />
        ) : (
          <>
            <ArrowBackIcon
              sx={iconStyle}
              onClick={() => navigate('/incidentes/')}
            />
            <div className="row incidente-select-row">
              <div className='incidente-select-inputs row col-xl-9 col-md-9 col-lg-9 col-sm-12 col-12'>
                <h2>Datos de Incidente</h2>

                <div className='incidente-data-show'>
                  <h5>Asunto</h5>
                  <p>{incidente.asunto}</p>
                </div>

                <div className='incidente-data-show'>
                  <h5>Detalle</h5>
                  <p>{incidente.detalle}</p>
                </div>

                <form
                  className='incidente-data-show incidente-data-form-estado'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormControl
                    variant='outlined'
                    sx={inputStyle}
                    size='small'
                  >
                    <InputLabel id="role-type">Estado</InputLabel>
                    <Controller
                      name="estado"
                      control={control}
                      defaultValue={incidente.estado}
                      render={({ field }) => (
                        <Select
                          labelId="role-type"
                          id="role-type"
                          label="Estado"
                          {...field}
                          sx={{ width: '200px', marginBottom: '10px' }}
                        >
                          <MenuItem value={'progresando'}>Progresando</MenuItem>
                          <MenuItem value={'terminado'}>Terminado</MenuItem>
                          <MenuItem value={'pendiente'}>Pendiente</MenuItem>
                          <MenuItem sx={{ display: 'none' }} value={'undefined'}></MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{
                      marginBottom: '10px',
                      marginLeft: '10px',
                      '@media (max-width: 578px)': {
                        marginLeft: '0px'
                      }
                    }}
                    type='submit'
                  >
                    Actualizar
                  </Button>
                </form>

                <div className='incidente-data-show'>
                  <h5>Nro. Departamento</h5>
                  <p>{incidente.departamento ? incidente.departamento.nroDepartamento : 'No detallado'}</p>
                </div>

                <div className='incidente-data-show'>
                  <h5>Propietario de departamento</h5>
                  <p>
                    {
                      incidente.departamento &&
                        incidente.departamento.propietario !== '' &&
                        incidente.departamento.propietario !== null ?
                        incidente.departamento.propietario :
                        'No detallado'
                    }
                  </p>
                </div>

                <div className='incidente-data-show'>
                  <h5>Nro. Bloque</h5>
                  <p>{incidente.bloque ? incidente.bloque.nroBloque : 'No detallado'}</p>
                </div>

                <div className='incidente-data-show'>
                  <h5>Bloque detalle</h5>
                  <p>
                    {
                      incidente.bloque &&
                        incidente.bloque.detalle !== '' &&
                        incidente.bloque.detalle !== null ?
                        incidente.bloque.detalle :
                        'No detallado'
                    }
                  </p>
                </div>
              </div>
              {
                incidente.user && typeof incidente.user.profile !== 'undefined' ? (
                  <div className="incidente-select-profile col-xl-3 col-md-3 col-lg-3 col-sm-12 col-12">
                    <h2>Perfil del residente</h2>

                    <div className='incidente-data-show'>
                      <h5>Nombre completo</h5>
                      <p>{`${incidente.user.profile.firstName} ${incidente.user.profile.lastName}`}</p>
                    </div>

                    <div className='incidente-data-show'>
                      <h5>Email</h5>
                      <p>{incidente.user.email}</p>
                    </div>

                    <div className='incidente-data-show'>
                      <h5>Nro. Celular</h5>
                      <p>{incidente.user.profile?.phoneNumber ?? 'No registra'}</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              }

            </div>
            <div className='incidente-select-photos'>
              <h2>Imagenes</h2>
              <ImageGallary incidente={incidente} />
            </div>
          </>
        )
      }
    </Layout>
  )
}

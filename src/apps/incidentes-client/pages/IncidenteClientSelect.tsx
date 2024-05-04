import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useIncidentesApi } from '../../incidentes-admin/hooks/useIncidente'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SmallLoading } from '../../../shared';
import { ImageGallary } from '../../incidentes-admin/components';
import { Layout } from '../components/Layout'

import '../../incidentes-admin/styles/incidentes/IncidenteSelectStye.css'
import { IStoreRedux } from '../../../store'

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

const IncidenteClientSelect = () => {
  // data
  const { incidente, loadingStateIncidente } = useSelector((store: IStoreRedux) => store.incidentes)

  // navegacion
  const navigate = useNavigate();

  // peticiones
  const { getOneIncidenteClient } = useIncidentesApi()

  // param
  const { id } = useParams();

  useEffect(() => {
    getOneIncidenteClient(parseInt(id ?? '1'))
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
              onClick={() => navigate('/incidentes/client')}
            />
            <div className="row incidente-select-row">
              <div className='incidente-select-inputs row col-xl-12 col-md-12 col-lg-12 col-sm-12 col-12'>
                <h2>Datos de Incidente</h2>

                <div className='incidente-data-show'>
                  <h5>Asunto</h5>
                  <p>{incidente.asunto}</p>
                </div>

                <div className='incidente-data-show'>
                  <h5>Detalle</h5>
                  <p>{incidente.detalle}</p>
                </div>

                <div className='incidente-data-show'>
                  <h5>Detalle</h5>
                  <p>{incidente.estado}</p>
                </div>

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

export default IncidenteClientSelect
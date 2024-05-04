import { Layout } from '../../components'
import { Link } from 'react-router-dom';
import '../../styles/ubicacion/HomeStyle.css'

export const HomeUbicacion = () => {
  return (
    <Layout>
      <br />
      <br />
      <h2 className='home-ubicacion-title'>¿Cual va gestionar?</h2>
      <div className='home-ubicacion-box'>
        <Link
          className='home-ubicacion-link'
          to={'/incidentes/ubicacion/bloques'}
        >
          Bloques
        </Link>
        <Link
          className='home-ubicacion-link'
          to={'/incidentes/ubicacion/departamento'}
        >
          Departamento
        </Link>
      </div>
    </Layout>
  )
}

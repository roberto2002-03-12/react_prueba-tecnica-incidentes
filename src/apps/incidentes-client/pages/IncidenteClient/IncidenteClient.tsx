import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table } from './components'
import { Layout } from '../../components'
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button'
import { Filters } from '../../../incidentes-admin/pages/incidentes/components'
import '../../styles/IncidenteClientStyle.css'
import { useIncidentesApi } from '../../../incidentes-admin/hooks/useIncidente';
import { useUbicacionApi } from '../../../incidentes-admin/hooks/useUbicacion';
import { IStoreRedux } from '../../../../store/store.model';
import { IIncidenteQuery } from '../../../incidentes-admin/models';

export const IncidenteClient = () => {
  const navigate = useNavigate();
  const { getAllIncidenteClient } = useIncidentesApi();
  const { getBloquesSelect } = useUbicacionApi();
  const [ params, setParams ] = useSearchParams();
  const [ page, setPage ] = useState(1);
  const { incidentes, loadingStateIncidente } = useSelector((state: IStoreRedux) => state.incidentes);
  const { bloqueSelect } = useSelector((state: IStoreRedux) => state.ubicacion);


  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const actualQuery = Object.fromEntries(params);
    setParams({ ...actualQuery, page: `${value}` });
  };

  useEffect(() => {
    const paramsObject: unknown = Object.fromEntries(params);
    (paramsObject as IIncidenteQuery).page = params.get('page') === null ? 1 : parseInt(params.get('page')!);
    getAllIncidenteClient(paramsObject as IIncidenteQuery);
  }, [params])

  useEffect(() => {
    getBloquesSelect()
  }, []);

  return (
    <Layout>
      <header className='incidente-client-header'>
      <h2>Tabla de incidencias</h2>
      
      <Button
        variant='contained'
        onClick={() => navigate('/incidentes/client/create')}
      >
        Registrar incidencia
      </Button>
      </header>
      <Filters 
        bloquesSelect={bloqueSelect}
        page={page}
        setParams={setParams}
        includeBloqueFilter={false}
      />
      <Table 
        incidentes={incidentes.data}
        loadingStateIncidente={loadingStateIncidente}
      />
      <Pagination 
          count={ Math.ceil(incidentes.count / 20) }
          page={ page }
          onChange={ handlePageChange }
        sx={{
          marginBottom: '50px'
        }}
      />
    </Layout>
  )
}

export default IncidenteClient

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIncidentesApi } from '../../hooks/useIncidente'
import { Filters, Table } from './components'
import { Layout } from '../../components'
import Pagination from '@mui/material/Pagination';
import { IStoreRedux } from '../../../../store';
import { IIncidenteQuery } from '../../models';
import { useUbicacionApi } from '../../hooks/useUbicacion';

export const IncidentePage = () => {
  const { getAllIncidenteAdmi } = useIncidentesApi();
  const { getBloquesSelect } = useUbicacionApi();
  const [ params, setParams ] = useSearchParams();
  const [page, setPage] = useState(1);
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
    getAllIncidenteAdmi(paramsObject as IIncidenteQuery);
  }, [params])

  useEffect(() => {
    getBloquesSelect()
  }, []);

  return (
    <Layout>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>Filtros Incidentes</h2>
      <Filters 
        bloquesSelect={ bloqueSelect }
        page={page}
        setParams={setParams}
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

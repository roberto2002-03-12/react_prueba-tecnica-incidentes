import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useUbicacionApi } from '../../../hooks/useUbicacion'
import { Layout } from '../../../components'
import { DepartamentoHeader, DepartamentoTable } from './components'
import Pagination from '@mui/material/Pagination';
import '../../../styles/ubicacion/HeaderStyle.css';

import { IStoreRedux } from '../../../../../store';

export const UbicacionPage = () => {
  const { getDepartamentos, deleteDepartamento } = useUbicacionApi();
  const [ page, setPage ] = useState(1);
  const { bloqueSelect, departamentos, loadingStateDepartamento } = useSelector((store: IStoreRedux) => store.ubicacion);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => setPage(value);
  
  useEffect(() => {
    getDepartamentos({ page })
  }, [page])

  return (
    <Layout>
      <DepartamentoHeader bloquesSelect={bloqueSelect} />
      <DepartamentoTable 
        departamentos={ departamentos.data } 
        loadingStateDepartamento={ loadingStateDepartamento }
        deleteDepartamento={ deleteDepartamento }
      />
      <Pagination 
        count={ Math.ceil(departamentos.count / 20) }
        page={ departamentos.page }
        onChange={ handlePageChange }
        sx={{
          marginBottom: '50px'
        }}
      />
    </Layout>
  )
}

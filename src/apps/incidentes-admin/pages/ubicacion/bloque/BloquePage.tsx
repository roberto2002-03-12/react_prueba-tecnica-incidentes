import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useUbicacionApi } from '../../../hooks/useUbicacion'
import { Layout } from '../../../components'
import { BloquesHeader, BloquesTable } from './components'
import Pagination from '@mui/material/Pagination';
import '../../../styles/ubicacion/HeaderStyle.css';

import { IStoreRedux } from '../../../../../store';

export const BloquePage = () => {
  const { getBloques, deleteBloque } = useUbicacionApi();
  const [ page, setPage ] = useState(1);
  const { bloques, loadingStateBloque } = useSelector((state: IStoreRedux) => state.ubicacion);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  useEffect(() => {
    getBloques({ page })
  }, [page])
  
  return (
    <Layout>
      <BloquesHeader />
      <BloquesTable 
        bloques={ bloques.data } 
        loadingStateBloque={ loadingStateBloque }
        deleteBloque={ deleteBloque }
      />
      <Pagination 
        count={ Math.ceil(bloques.count / 20) }
        page={ bloques.page }
        onChange={ handlePageChange }
        sx={{
          marginBottom: '50px'
        }}
      />
    </Layout>
  )
}

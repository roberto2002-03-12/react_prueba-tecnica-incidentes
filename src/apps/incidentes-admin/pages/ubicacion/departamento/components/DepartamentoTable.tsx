import { SmallLoading } from '../../../../../../shared';
import Swal from "sweetalert2";
import Delete from '@mui/icons-material/Delete'
import '../../../../styles/TableStyle.css'
import { TypeLoadingState } from '../../../../../../store';
import { IDepartamento } from '../../../../models';
import { truncateString } from '../../../../../../helpers';

interface DepartamentoProps {
  loadingStateDepartamento: TypeLoadingState;
  departamentos: IDepartamento[];
  deleteDepartamento: (departamentoId: number) => Promise<void>
}

export const DepartamentoTable = ({ loadingStateDepartamento, departamentos, deleteDepartamento }: DepartamentoProps) => {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el departamento?`,
      showCancelButton: true,
      confirmButtonText: 'Seguro',
    }).then((result) => {
      if (result.isConfirmed) deleteDepartamento(id)
    })
  };

  return (
    <div className='incidentes-table-box'>
      {
        loadingStateDepartamento === 'loading' ? (
          <SmallLoading />
        ) : (
          <table className='table table-striped incidentes-table'>
            <thead>
              <tr>
                <th scope='col'>Departamento</th>
                <th scope='col'>Propietario</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                departamentos.map(row => (
                  <tr key={ row.id }>
                    <td>{row.nroDepartamento}</td>
                    <td>{truncateString(row?.propietario ?? '', 25)}</td>
                    <td>
                      <div style={{ width: '100%', display:'flex', justifyContent: 'center' }}>
                        <Delete 
                          sx={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDelete(row.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}

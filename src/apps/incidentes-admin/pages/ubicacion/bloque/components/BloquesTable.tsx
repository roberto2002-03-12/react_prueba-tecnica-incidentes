import { SmallLoading } from '../../../../../../shared';
import Swal from "sweetalert2";
import Delete from '@mui/icons-material/Delete'
import '../../../../styles/TableStyle.css'
import { TypeLoadingState } from '../../../../../../store';
import { IBloque } from '../../../../models';

interface BloqueProps {
  loadingStateBloque: TypeLoadingState;
  bloques: IBloque[];
  deleteBloque: (bloqueId: number) => Promise<void>
}

export const BloquesTable = ({ loadingStateBloque, bloques, deleteBloque }: BloqueProps) => {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el bloque?`,
      showCancelButton: true,
      confirmButtonText: 'Seguro',
    }).then((result) => {
      if (result.isConfirmed) deleteBloque(id)
    })
  };

  return (
    <div className='incidentes-table-box'>
      {
        loadingStateBloque === 'loading' ? (
          <SmallLoading />
        ) : (
          <table className='table table-striped incidentes-table'>
            <thead>
              <tr>
                <th scope='col'>Bloque</th>
                <th scope='col'>Detalle</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                bloques.map(row => (
                  <tr key={ row.id }>
                    <td>{row.nroBloque}</td>
                    <td>{row.detalle}</td>
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

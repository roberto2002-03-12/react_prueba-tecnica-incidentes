import { useNavigate } from 'react-router-dom'
import { SmallLoading } from '../../../../../shared';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import '../../../styles/TableStyle.css'
import { TypeLoadingState } from '../../../../../store';
import { IIncidente } from '../../../models';
import { truncateString } from '../../../../../helpers';

interface IncidenteTableProps {
  loadingStateIncidente: TypeLoadingState;
  incidentes: IIncidente[];
}

export const Table = ({ loadingStateIncidente, incidentes }: IncidenteTableProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='incidentes-table-box'>
        {
          loadingStateIncidente === 'loading' ? (
            <SmallLoading />
          ) : (
            <table className='table table-striped incidentes-table'>
              <thead>
                <tr>
                  <th scope='col'>Asunto</th>
                  <th scope='col'>Estado</th>
                  <th scope='col'>Detalle</th>
                  <th scope='col'>Fecha registro</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  incidentes.map(row => (
                    <tr key={ row.id }>
                      <td>{truncateString(row?.asunto ?? '', 32)}</td>
                      <td>{row.estado}</td>
                      <td>{truncateString(row?.detalle ?? '', 32)}</td>
                      <td>{row.createdAt.toString()}</td>
                      <td>
                        <div style={{ width: '100%', display:'flex', justifyContent: 'center' }}>
                          <RemoveRedEyeIcon 
                            sx={{ color: '#0d6efd', cursor: 'pointer' }}
                            onClick={() => navigate(`/incidentes/${row.id}`)}
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
    </>
  )
}

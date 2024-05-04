import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch } from 'react-redux';
import { onSetIncidente } from '../../../../../store/incidente/incidenteSlice';
import { SmallLoading } from '../../../../../shared';
import { truncateString } from '../../../../../helpers';
import { IncidenteTableProps } from '../../../../incidentes-admin/models'
import { useIncidentesApi } from '../../../../incidentes-admin/hooks/useIncidente';
import Swal from 'sweetalert2';

export const Table = ({ incidentes, loadingStateIncidente }: IncidenteTableProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteIncidenteClient } = useIncidentesApi();
  onSetIncidente

  const handleDelete = (id: number) => {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar este registro?`,
      showCancelButton: true,
      confirmButtonText: 'Seguro',
    }).then((result) => {
      if (result.isConfirmed) deleteIncidenteClient(id)
    })
  };

  return (
    <div className='incidente-client-table'>
      {
        loadingStateIncidente === 'loading' ? (
          <SmallLoading />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Estado</th>
                <th scope="col">Asunto</th>
                <th scope="col">Detalle</th>
                <th scope='col'>Fecha registro</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>

              {
                incidentes.map(row => (
                  <tr>
                    <td>
                      <FiberManualRecordIcon
                        sx={{ 
                          color: row.estado === 'pendiente' ? 'yellow' 
                          : row.estado === 'terminado' ? 'lightgreen'
                          : 'red'
                        }}
                      />
                      { row.estado }
                    </td>
                    <td>{ truncateString(row.asunto ?? 'No especifica') }</td>
                    <td>{ truncateString(row.detalle ?? 'No especifica') }</td>
                    <td>{ row.createdAt.toString() }</td>
                    <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                      <div onClick={() => {
                        dispatch(onSetIncidente(row))
                        navigate(`/incidentes/client/update/${row.id}`)}}>
                        <CreateIcon color='warning'/>
                      </div>
                      <div onClick={() => handleDelete(row.id)}>
                        <DeleteIcon color='error' />
                      </div>
                      <div onClick={() => navigate(`/incidentes/client/${row.id}`)}>
                        <RemoveRedEyeIcon 
                          color='info'
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

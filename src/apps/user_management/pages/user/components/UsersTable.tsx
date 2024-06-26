import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useUserManagementApi } from '../../../hooks/useUserManagementApi'
import { IUser } from '../../../../auth/model';
import { TypeLoadingState, onSelectUser } from '../../../../../store'
import { SmallLoading } from '../../../../../shared';
import { truncateString } from '../../../../../helpers/string.helper';
import Swal from "sweetalert2";

export const UsersTable = (
  {
    users,
    loadingState
  }: {
    users: IUser[];
    loadingState: TypeLoadingState
  }
) => {

  const { desactivateUser } = useUserManagementApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: number, active: boolean) => {
    Swal.fire({
      title: `Are you sure you want to ${active === true ? 'desactivate' : 'activate'} this user`,
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      if (result.isConfirmed) {
        desactivateUser(id);
      }
    });
  };

  const handleSelect = (user: IUser) => {
    dispatch(onSelectUser(user));
    navigate(`/user-management/users/${user.id}`);
  };

  return (
    <>
      <div className="um-table-box">
        {
          loadingState === 'loading' ? (
            <SmallLoading />
          ) : (
            <table className="table table-striped um-table">
              <thead>
                <tr>
                  <th scope="col">Nombre completo</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Fecha registro</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(row => (
                    <tr key={ row.id }>
                      <td> <p>{row.profile && row.profile.firstName && row.profile.lastName ? truncateString(`${row.profile.firstName} ${row.profile.lastName}`, 28) : 'not registed' }</p> </td>
                      <td> <p>{truncateString(row.email, 25)}</p> </td>
                      <td> <p>{typeof row.role === 'undefined' ? 'not asigned' : row.role.length > 0 ? `${row.role[0].roleName}` : 'not asigned'}</p> </td>
                      <td> <p>{`${row.created_at}`}</p> </td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-warning dropdown-toggle um-table-dropdown"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Acción
                          </button>
                          <ul className="dropdown-menu">
                            <li><button style={{ border: '0' }} className="dropdown-item" onClick={() => handleSelect(row) }>Ver perfil o cambiar rol</button></li>
                            <li><button style={{ border: '0' }} className="dropdown-item" onClick={ () => handleDelete(row.id, row.active) }>{ row.active === true ? 'Desactivar' : 'Activar' }</button></li>
                          </ul>
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

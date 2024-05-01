import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserManagementApi } from '../../hooks/useUserManagementApi'
import { NavBar } from '../../components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import '../../styles/UserCreateStyle.css';
import { IRoleForSelect, IUserInputs } from '../../models';
import { IStoreRedux } from '../../../../store'
import { SmallLoading } from '../../../../shared';

const defaultValues: IUserInputs = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birth: null,
  phoneNumber: ''
}

const inputStyle = {
  width: '180px',
  margin: '20px',
}

export const CreateUser = () => {
  const { getRolesForSelect, createUser } = useUserManagementApi();
  const { rolesForSelect, loadingRolesState } = useSelector((state: IStoreRedux) => state.userManagement);
  const [ rolesSelected, setRoleSelected ] = useState<IRoleForSelect[]>([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset, 
    control
  } = useForm<IUserInputs>({defaultValues});

  const onSubmit: SubmitHandler<IUserInputs> = (data) => {
    if (Object.keys(errors).length > 0) return;

    if (rolesSelected.length > 0) {
      const actual = rolesSelected;
      createUser(data, actual);
    } else {
      createUser(data);
    }
    reset();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckBoxChange = (idRole: number, roleName: string) => (_event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleSelected((prev: IRoleForSelect[]) => {
      const selectedRole = prev.find(r => r.id === idRole);

      if (selectedRole) return prev.filter(r => r.id !== selectedRole.id)
      else {
        return [
          ...prev,
          {
            id: idRole,
            roleName
          }
        ]
      }
    });
  };

  useEffect(() => {
    getRolesForSelect();
  }, [])

  const rolesFiltered = useMemo(() => {
    return rolesForSelect.filter(role => role.roleName.toLowerCase().includes(filter.toLocaleLowerCase()) )
  }, [filter]);

  return (
    <>
      <NavBar />
      <div className="container create-user-container">
        <form onSubmit={ handleSubmit(onSubmit) } className='horrible-form-which-destroy-everything'>
          <div className="create-user-options">
            <span>
              <Button
                variant='text'
                size='small'
                sx={{ color: 'gray' }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />
              </Button>
              Regresar
            </span>
            <Button
              type='submit'
              variant='outlined'
              size='small'
            >
              Crear usuario
            </Button>
          </div>
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 create-user-inputs">
              <TextField
                error={ errors.email && isSubmitted }
                helperText={ errors.email && isSubmitted ? errors.email.message : '' }
                {
                  ...register('email', {
                    required: 'Email requerido',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email invalido'
                    },
                    maxLength: {
                      value: 105,
                      message: 'Máximo 105 caracteres'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={inputStyle}
                label='Email'
                placeholder='ejemplo@gmail.com'
              />

              <TextField
                error={ errors.password && isSubmitted }
                helperText={ errors.password && isSubmitted ? errors.password.message : '' }
                {
                  ...register('password', {
                    required: 'Contraseña requerida',
                    minLength: {
                      value: 8,
                      message: 'Debe tener por lo menos 8 caracteres'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={inputStyle}
                label='Contraseña'
                placeholder='********'
                type='password'
              />

              <TextField
                error={ errors.firstName && isSubmitted }
                helperText={ errors.firstName && isSubmitted ? errors.firstName.message : '' }
                {
                  ...register('firstName', {
                    required: 'Nombres requerido',
                    minLength: {
                      value: 3,
                      message: 'Minimo 3 caracteres'
                    },
                    maxLength: {
                      value: 55,
                      message: 'Máximo 55 caracteres'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={inputStyle}
                label='Nombres'
                placeholder='Roberto'
              />

              <TextField 
                error={ errors.lastName && isSubmitted }
                helperText={ errors.lastName && isSubmitted ? errors.lastName.message : '' }
                {
                  ...register('lastName', {
                    required: 'Apellidos requerido',
                    minLength: {
                      value: 3,
                      message: 'Minimo 3 caracteres'
                    },
                    maxLength: {
                      value: 55,
                      message: 'Máximo 55 caracteres'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={inputStyle}
                label='Apellidos'
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name='birth'
                  control={ control }
                  render={
                    ({ field }) => (
                      <DatePicker
                        {...field}
                        label='Nacimiento'
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            size: 'small',
                            error: errors.birth && isSubmitted,
                            helperText: errors.birth && isSubmitted ? errors.birth.message : ''
                          }
                        }}
                        sx={inputStyle}
                      />
                    )
                  }
                  rules={{
                    required: 'Nacimiento requerido'
                  }}
                />
              </LocalizationProvider>

              <TextField
                error={ errors.phoneNumber && isSubmitted }
                helperText={ errors.phoneNumber && isSubmitted ? errors.phoneNumber.message : '' }
                {
                  ...register('phoneNumber', {
                    required: 'Nro Celular requerido',
                    minLength: {
                      value: 7,
                      message: 'Minimo 7 caracteres'
                    },
                    maxLength: {
                      value: 25,
                      message: 'Máximo 25 caracteres'
                    },
                    pattern: {
                      value: /^[0-9() +-]*$/,
                      message: 'Sole se permite números y "() + -"'
                    }
                  })
                }
                variant='outlined'
                size='small'
                sx={inputStyle}
                label='Nro celular'
                placeholder='+51 965368241'
              />
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 create-user-roles-aside">
              <TextField 
                variant='outlined'
                label='Filtrar rol'
                name='roleNameFilter'
                sx={{ marginBottom: '10px' }}
                size='small'
                value={filter}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)}
              />
              <div className="create-user-roles-aside-list">
                {
                  loadingRolesState === 'loading' 
                  ? <SmallLoading /> 
                  : (
                    <List>
                      {
                        (filter === '' ? rolesForSelect : rolesFiltered).map((row) => (
                          <ListItem
                            key={row.id}
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemIcon>
                                <Checkbox 
                                  checked={ rolesSelected.some(r => r.id === row.id) }
                                  edge='start'
                                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${row.id}` }}
                                  onChange={ handleCheckBoxChange(row.id, row.roleName) }
                                />
                              </ListItemIcon>
                              <ListItemText id={`checkbox-list-label-${row.id}`} primary={ row.roleName } />
                            </ListItemButton>
                          </ListItem>
                        ))
                      }
                    </List>
                  )
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

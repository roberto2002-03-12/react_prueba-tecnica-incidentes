import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAuthApi } from '../../../hook/useAuthApi';
import { onStartLogin } from '../../../../../store';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IUserRegisterInputs } from '../../../model'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../../../styles/RegisterStyle.css'

const inputStyle = {
  width: '225px',
  marginTop: '5px',
  marginBottom: '5px',
  marginRight: '15px',
  marginLeft: '15px'
}

export const Register = () => {
  const { register: registerApi } = useAuthApi()
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    control
  } = useForm<IUserRegisterInputs>({
    defaultValues: {
      birth: null
    }
  });

  const onSubmit: SubmitHandler<IUserRegisterInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    registerApi(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='register-title'>Registro</h2>
      <div className="register-inputs">
        <TextField
          error={errors.email && isSubmitted}
          helperText={errors.email && isSubmitted ? errors.email.message : ''}
          label='Email'
          variant='standard'
          placeholder='ejemplo@email.com'
          {
          ...register(
            'email',
            {
              required: 'Email requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email invalido'
              },
              maxLength: {
                value: 105,
                message: 'Máximo 105 caracteres'
              }
            }
          )
          }
          style={inputStyle}
        />

        <TextField
          error={errors.password && isSubmitted}
          helperText={errors.password && isSubmitted ? errors.password.message : ''}
          label='Contraseña'
          variant='standard'
          placeholder='******'
          {
          ...register('password', {
            required: 'Contraseña requerida',
            minLength: {
              value: 8,
              message: 'Debe tener por lo menos 8 caracteres'
            },
            maxLength: {
              value: 255,
              message: 'Máximo 255 caracteres'
            }
          })
          }
          type='password'
          style={inputStyle}
        />

        <TextField
          error={errors.firstName && isSubmitted}
          helperText={errors.firstName && isSubmitted ? errors.firstName.message : ''}
          label='Nombres'
          variant='standard'
          placeholder='Roberto'
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
          style={inputStyle}
        />

        <TextField
          error={errors.lastName && isSubmitted}
          helperText={errors.lastName && isSubmitted ? errors.lastName.message : ''}
          label='Apellidos'
          variant='standard'
          placeholder='Contreras'
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
          style={inputStyle}
        />

        <TextField
          error={errors.phoneNumber && isSubmitted}
          helperText={errors.phoneNumber && isSubmitted ? errors.phoneNumber.message : ''}
          label='Nro Celular'
          variant='standard'
          placeholder='+51 965 368 241'
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
          style={inputStyle}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='birth'
            control={control}
            render={
              ({ field }) => (
                <DatePicker
                  {...field}
                  label='Nacimiento'
                  slotProps={{
                    textField: {
                      variant: 'standard',
                    }
                  }}
                  sx={inputStyle}
                />
              )
            }
          />
        </LocalizationProvider>


        <p
          className='register-link'
          onClick={() => dispatch(onStartLogin())}
        >
          ¿Ya tienes una cuenta?
        </p>

        <Button
          type='submit'
          variant='contained'
          style={{ backgroundColor: '#f585b1' }}
        >
          Registrarse
        </Button>
      </div>
    </form>
  )
}

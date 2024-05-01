import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { onStartRecovery, onStartRegister } from '../../../../../store';
import { useAuthApi } from '../../../hook/useAuthApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../styles/LoginStyle.css';
import { IUserLoginInputs } from '../../../model';

const inputStyle = {
  width: '225px',
  marginTop: '5px',
  marginBottom: '5px'
}

export const Login = () => {
  const { login } = useAuthApi();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IUserLoginInputs>();

  const onSubmit: SubmitHandler<IUserLoginInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    login(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='auth-box-title'>
          <h2 className='auth-title'>Reporte de incidencias</h2>
          <span className='auth-span'>Hecho por </span><a className='auth-link-github' href="https://github.com/roberto2002-03-12" target='_blank'>roberto2002-03-12@github</a>
        </div>
        <div className='auth-inputs'>
          <TextField
            error={ errors.email && isSubmitted }
            helperText={ errors.email && isSubmitted ? errors.email.message : '' }
            label='Email'
            variant='standard'
            placeholder='example@email.com'
            {
              ...register(
                'email', 
                {
                  required: 'Email requerido',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Email invalido'
                  }
                }
              )
            }
            style={inputStyle}
          />
          <TextField
            error={ errors.password && isSubmitted }
            helperText={ errors.password && isSubmitted ? errors.password.message : '' }
            label='Contraseña'
            variant='standard'
            placeholder='******'
            {
              ...register('password', {
                required: 'Contraseña requerida',
                minLength: {
                  value: 8,
                  message: 'Debe tener por lo menos 8 caracteres'
                }
              })
            }
            type='password'
            style={inputStyle}
          />
          <div className='auth-link'>
            <span
              className='auth-recovery-link'
              onClick={() => dispatch(onStartRecovery())}
            >
              ¿Te olvidaste la contraseña?
            </span>
            <span
              className='auth-recovery-link'
              onClick={() => dispatch(onStartRegister())}
            >
              Registrate
            </span>
          </div>
          <Button
            type='submit'
            variant='contained'
            style={{ backgroundColor: '#f585b1' }}
          >
            Login
          </Button>
        </div>
      </form>
    </>
  )
}

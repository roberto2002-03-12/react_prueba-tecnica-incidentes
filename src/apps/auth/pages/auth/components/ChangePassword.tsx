import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthApi } from '../../../hook/useAuthApi'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import '../../../styles/ChangePasswordStyle.css';
import { IRecoveryChangePasswordInputs } from '../../../model'

export const ChangePassword = () => {
  const { changePasswordRecovery } = useAuthApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset, setError
  } = useForm<IRecoveryChangePasswordInputs>();

  const onSubmit: SubmitHandler<IRecoveryChangePasswordInputs> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (data.repeatPassword !== data.newPassword) {
      setError('repeatPassword', {
        message: 'Las contraseñas deben ser iguales'
      })

      return;
    }

    changePasswordRecovery(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-password-title">
        <h2>Cambia tu contraseña</h2>
      </div>
      <div className="auth-password-inputs">
        <TextField
          error={errors.newPassword && isSubmitted}
          helperText={errors.newPassword && isSubmitted ? errors.newPassword.message : ''}
          {
            ...register(
              'newPassword',
              {
                required: 'Contraseña requerida',
                minLength: {
                  value: 8,
                  message: 'Minimo 8 caracteres'
                },
                maxLength: {
                  value: 255,
                  message: 'Máximo 255 caracteres'
                }
              }
            )
          }
          type='password'
          label='Contraseña'
          variant='standard'
          placeholder='*********'
        />
        <TextField
          error={errors.repeatPassword && isSubmitted}
          helperText={errors.repeatPassword && isSubmitted ? errors.repeatPassword.message : ''}
          {
            ...register(
              'repeatPassword',
              {
                required: 'Debes repetir la contraseña',
                minLength: {
                  value: 8,
                  message: 'Minimo 8 caracteres'
                },
                maxLength: {
                  value: 255,
                  message: 'Máximo 255 caracteres'
                }
              }
            )
          }
          type='password'
          name='repeatPassword'
          label='Repetir contraseña'
          variant='standard'
          placeholder='*********'
        />
        <TextField
          error={errors.recoveryToken && isSubmitted}
          helperText={errors.recoveryToken && isSubmitted ? errors.recoveryToken.message : ''}
          {
            ...register('recoveryToken', {
              required: 'Debes ingresar el token'
            })
          }
          label='Token de confirmación'
          variant='standard'
        />
      </div>
      <Button
        style={{
          backgroundColor: '#f585b1',
          marginTop: '20px'
        }}
        variant='contained'
        type='submit'
      >
        Confirmar cambio
      </Button>
    </form>
  )
}

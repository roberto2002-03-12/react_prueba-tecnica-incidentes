import { useForm, SubmitHandler } from 'react-hook-form'
import { useUbicacionApi } from '../../../../hooks/useUbicacion'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DepartamentoInputProps, IBloque } from '../../../../models';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const inputStyle = {
  marginBottom: '10px',
  widht: '200px'
}

interface BloqueModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  bloquesSelect: IBloque[]
}

export const DepartamentoModal = ({ open, setOpen, bloquesSelect }: BloqueModalProps) => {
  const { postDepartamento, getDepartamentos, getBloquesSelect } = useUbicacionApi();

  const {
    register,
    formState: { errors, isSubmitted },
    reset,
    handleSubmit
  } = useForm<DepartamentoInputProps>()

  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<DepartamentoInputProps> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    postDepartamento(data);
    reset();
    getDepartamentos({ page: 1 });
    setOpen(false)
  }

  useEffect(() => {
    getBloquesSelect()
  }, [])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Registrar bloque
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant='standard'
            label='Nro Departamento'
            {
            ...register('nroDepartamento', {
              required: {
                message: 'Nro. bloque es requerido',
                value: true
              },
              minLength: {
                value: 1,
                message: 'Minimo 1 caracter'
              },
              maxLength: {
                value: 25,
                message: 'Máximo 25 caracteres'
              }
            })
            }
            error={errors.nroDepartamento && isSubmitted}
            helperText={errors.nroDepartamento && isSubmitted ? errors.nroDepartamento.message : ''}
            sx={inputStyle}
          />
          <TextField
            variant='standard'
            label='Propietario'
            {
            ...register('propietario', {
              minLength: {
                value: 1,
                message: 'Minimo 1 caracter'
              },
              maxLength: {
                value: 25,
                message: 'Máximo 25 caracteres'
              }
            })
            }
            error={errors.propietario && isSubmitted}
            helperText={errors.propietario && isSubmitted ? errors.propietario.message : ''}
            sx={inputStyle}
          />
          <FormControl
            variant='outlined'
            sx={inputStyle}
            size='small'
          >
            <InputLabel id="role-type">Bloque</InputLabel>
            <Select
              labelId="role-type"
              id="role-type"
              label="Bloque"
              {
                ...register('bloqueId', {
                  required: false
                })
              }
              defaultValue={''}
              sx={{ width: '200px' }}
            >
              {
                bloquesSelect.map((val) => (
                  <MenuItem key={ val.id } value={val.id}>{ val.nroBloque }</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Button
            variant='contained'
            type='submit'
          >
            Registrar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
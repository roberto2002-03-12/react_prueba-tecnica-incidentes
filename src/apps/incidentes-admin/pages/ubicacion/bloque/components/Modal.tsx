import { useForm, SubmitHandler } from 'react-hook-form'
import { useUbicacionApi } from '../../../../hooks/useUbicacion'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BloqueInputProps } from '../../../../models';

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
  marginBottom: '10px'
}

interface BloqueModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const BloqueModal = ({ open, setOpen }: BloqueModalProps) => {
  const { postBloque, getBloques } = useUbicacionApi();

  const {
    register,
    formState: { errors, isSubmitted },
    reset,
    handleSubmit
  } = useForm<BloqueInputProps>()

  const handleClose = () => setOpen(false);


  const onSubmit: SubmitHandler<BloqueInputProps> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    postBloque(data);
    reset();
    getBloques({ page: 1 });
    setOpen(false)
  }

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
            label='Nro Bloque'
            {
              ...register('nroBloque', {
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
            error={ errors.nroBloque && isSubmitted }
            helperText={ errors.nroBloque && isSubmitted ? errors.nroBloque.message : '' }
            sx={inputStyle}
          />
          <TextField
            variant='standard'
            label='Detalle'
            {
              ...register('detalle', {
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
            error={ errors.detalle && isSubmitted }
            helperText={ errors.detalle && isSubmitted ? errors.detalle.message : '' }
            sx={inputStyle}
          />
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
import { useState } from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import ImageList from '@mui/material/ImageList'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { IFoto, IIncidente } from '../models'
import '../styles/ImageGallary.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  '@media (max-width: 578px)': {
    width: '300px'
  }
};

export const ImageGallary = ({ incidente }: { incidente: IIncidente }) => {
  const [open, setOpen] = useState(false);
  const [fotoToShow, setFotoToShow] = useState<IFoto>({
    fotoNombre: '',
    fotoUrl: '',
    id: 0,
    incidenteId: 0
  });

  const handleOpen = (foto: IFoto) => {
    setFotoToShow(foto);
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <>
      {
        incidente.fotos && incidente.fotos.length >= 1 ? (
          <>
            <ImageList sx={{ width: '100%', height: 500 }} variant='standard' cols={2}>
              {incidente.fotos!.map((foto) => (
                <ImageListItem key={foto.id}>
                  <img
                    className='incidente-img-list'
                    srcSet={`${foto.fotoUrl}`}
                    src={`${foto.fotoUrl}`}
                    alt={'photo not loaded'}
                    loading="lazy"
                    onClick={() => handleOpen(foto)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  className='incidente-img-modal'
                  src={fotoToShow.fotoUrl}
                  alt="Image not loaded"
                  loading='lazy'
                />
              </Box>
            </Modal>
          </>
        ) : (
          <>
            <ImageNotSupportedIcon
              sx={{
                width: '300px',
                height: '300px'
              }}
            />
            <p>No hay imagenes</p>
          </>
        )
      }
    </>
  )
}

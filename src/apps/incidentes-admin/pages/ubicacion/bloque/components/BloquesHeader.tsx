import { useState } from 'react'
import { BloqueModal } from './'
import Button from '@mui/material/Button';

export const BloquesHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BloqueModal setOpen={ setOpen } open={ open }/>
      <header className='incidentes-ubicacion-header'>
        <h2 className='incidentes-ubicacion-header-h2'>Lista de Bloques</h2>
        <Button
          sx={{
            backgroundColor: '#f585b1',
            '&:hover': {
              backgroundColor: '#df79a1', // Cambia el color al pasar el cursor sobre el botón
            },
            color: 'white'
          }}
          variant='contained'
          size='small'
          onClick={() => setOpen(true)}
        >
          Crear bloque
        </Button>
      </header>
    </>
  )
}

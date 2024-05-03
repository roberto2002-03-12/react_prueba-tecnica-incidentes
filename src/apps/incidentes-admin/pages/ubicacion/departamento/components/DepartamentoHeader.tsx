import { useState } from 'react'
import { DepartamentoModal } from './'
import Button from '@mui/material/Button';
import { IBloque } from '../../../../models';

interface DepartamentoHeaderProps {
  bloquesSelect: IBloque[]
}

export const DepartamentoHeader = ({ bloquesSelect }: DepartamentoHeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DepartamentoModal setOpen={ setOpen } open={ open } bloquesSelect={ bloquesSelect }/>
      <header className='incidentes-ubicacion-header'>
        <h2 className='incidentes-ubicacion-header-h2'>Lista de Depas</h2>
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
          Crear depa
        </Button>
      </header>
    </>
  )
}

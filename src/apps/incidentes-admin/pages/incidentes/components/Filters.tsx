import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IBloque, IIncidenteQuery } from '../../../models';
import { SetURLSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../../styles/FiltersStyle.css'

interface FIlterInputProps {
  setParams: SetURLSearchParams;
  page: number;
  bloquesSelect: IBloque[];
  includeBloqueFilter?: boolean
}

const inputStyle = {
  width: '180px',
  marginLeft: '15px',
  marginRight: '15px',
  marginBottom: '10px'
}

const buttonStyle = {
  width: '150px'
}

const defaultValues: IIncidenteQuery = {
  bloqueId: '',
  createdAtEnd: null,
  createdAtStart: null,
  estado: ''
}

export const Filters = ({ 
  setParams, 
  page, 
  bloquesSelect,
  includeBloqueFilter = true
}: FIlterInputProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IIncidenteQuery>({ defaultValues });

  const onSubmit: SubmitHandler<IIncidenteQuery> = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const paramsObj: Record<string, string | string[]> = {};

    (Object.keys(data) as (keyof typeof data)[]).forEach(key => {
      if (typeof data[key] !== 'undefined' && data[key] !== '' && data[key] !== null && data[key]) {
        paramsObj[key] = String(data[key]);
      }
    });

    setParams({ ...paramsObj, page: `${page}` });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='incidentes-filters-form'>
      <div className='incidentes-filters-inputs'>
        <FormControl
          variant='outlined'
          sx={inputStyle}
          size='small'
        >
          <InputLabel id="role-type">Estado</InputLabel>
          <Controller
            name="estado"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                labelId="role-type"
                id="role-type"
                label="Estado"
                {...field}
                sx={{ width: '180px' }}
              >
                <MenuItem value={'progresando'}>Progresando</MenuItem>
                <MenuItem value={'terminado'}>Terminado</MenuItem>
                <MenuItem value={'pendiente'}>Pendiente</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {
          includeBloqueFilter === true ? (
            <FormControl
            variant='outlined'
            sx={inputStyle}
            size='small'
          >
            <InputLabel id="role-type">Bloque</InputLabel>
            <Controller
              name="bloqueId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  labelId="role-type"
                  id="role-type"
                  label="Bloque"
                  {...field}
                  sx={{ width: '180px' }}
                >
                  {
                    bloquesSelect.map((val) => (
                      <MenuItem key={val.id} value={val.id}>{val.nroBloque}</MenuItem>
                    ))
                  }
                </Select>
              )}
            />
          </FormControl>
          ) : <></>
        }



        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='createdAtStart'
            control={control}
            render={
              ({ field }) => (
                <DatePicker
                  {...field}
                  label='Registro inicio'
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                    }
                  }}
                  sx={inputStyle}
                  onChange={(date) => field.onChange(date)}
                  value={field.value ? new Date(field.value) : null}
                />
              )
            }
          />

          <Controller
            name='createdAtEnd'
            control={control}
            render={
              ({ field }) => (
                <DatePicker
                  {...field}
                  label='Registro fin'
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                    }
                  }}
                  sx={inputStyle}
                  onChange={(date) => field.onChange(date)}
                  value={field.value ? new Date(field.value) : null}
                />
              )
            }
          />
        </LocalizationProvider>
      </div>

      <div className='incidentes-filters-button'>
        <Button
          type='submit'
          variant='contained'
          size='small'
          sx={buttonStyle}
        >
          Aplicar filtros
        </Button>
        <Button
          onClick={() => reset()}
          variant='contained'
          size='small'
          sx={buttonStyle}
        >
          Delete filters
        </Button>
      </div>
    </form>
  )
}

import { IBloque, IDepartamento } from '../../apps/incidentes-admin/models'
import { TypeLoadingState } from '../user_management/slice.model'

export interface BloqueSlice {
  loadingStateBloque: TypeLoadingState;
  loadingStateDepartamento: TypeLoadingState;
  bloques: {
    count: number;
    page: number;
    data: IBloque[]
  },
  bloque: IBloque
  bloqueSelect: IBloque[]
  departamentos: {
    count: number;
    page: number;
    data: IDepartamento[]
  },
  departamento: IDepartamento
};
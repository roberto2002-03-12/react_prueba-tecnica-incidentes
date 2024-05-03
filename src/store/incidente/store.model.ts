import { IIncidente } from '../../apps/incidentes-admin/models'
import { TypeLoadingState } from '../user_management/slice.model'

export interface IncidenteSlice {
  loadingStateIncidente: TypeLoadingState;
  incidente: IIncidente;
  incidentes: {
    count: number;
    page: number;
    data: IIncidente[]
  };
}
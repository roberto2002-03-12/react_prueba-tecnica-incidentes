import { AuthSlice, UserManagementSlice, CatSlice, BloqueSlice, IncidenteSlice } from './'

export interface IStoreRedux {
  auth: AuthSlice;
  userManagement: UserManagementSlice;
  cat: CatSlice;
  ubicacion: BloqueSlice;
  incidentes: IncidenteSlice;
}
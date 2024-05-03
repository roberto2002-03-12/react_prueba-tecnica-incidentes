import { AuthSlice, UserManagementSlice, CatSlice, BloqueSlice } from './'

export interface IStoreRedux {
  auth: AuthSlice;
  userManagement: UserManagementSlice;
  cat: CatSlice;
  ubicacion: BloqueSlice;
}
import { IUser } from '../../auth/model';
import { IDepartamento, IBloque } from './'
export type IncidenteEstadoType = 'progresando' | 'terminado' | 'pendiente' | '';

export interface IFoto {
  id: number;
  fotoNombre: string;
  fotoUrl: string;
  incidenteId: number;
}

export interface IIncidente {
  id: number;
  asunto: string;
  estado: IncidenteEstadoType;
  detalle: string;

  userId: number;
  departamentoId: number;
  bloqueId: number;

  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;

  // tabla relación
  fotos?: IFoto[]

  departamento?: IDepartamento;
  bloque?: IBloque;
  user: IUser;
}

export interface IncidenteInputProps {
  asunto: string;
  estado: IncidenteEstadoType;
  departamentoId: number;
  bloqueId: number;
}

export interface IIncidenteQuery {
  page?: number;
  limit?: number;
  estado?: IncidenteEstadoType;
  bloqueId?: number | string;
  createdAtStart?: string | null;
  createdAtEnd?: string | null;
}
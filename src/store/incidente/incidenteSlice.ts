import { createSlice } from '@reduxjs/toolkit';
import { IIncidente } from '../../apps/incidentes-admin/models';

export const incidenteSlice = createSlice({
  name: 'incidente',
  initialState: {
    loadingStateIncidente: 'loading', // finished
    incidente: {},
    incidentes: {
      count: 0,
      page: 1,
      data: []
    }
  },
  reducers: {
    // basico para admin
    onLoadIncidente: (state) => {
      state.loadingStateIncidente = 'loading';
    },
    onLoadedIncidente: (state, { payload }) => {
      state.incidente = payload;
      state.loadingStateIncidente = 'finished'
    },
    onLoadedIncidentes: (state, { payload }) => {
      state.incidentes = payload;
      state.loadingStateIncidente = 'finished'
    },
    onSetFinishedLoad: (state) => {
      state.loadingStateIncidente = 'finished'
    },
    // colocar el resto para cliente
    onDeleteIncidente: (state, { payload }) => {
      state.incidentes.data = state.incidentes.data.filter((val: IIncidente) => val.id !== payload);
      state.loadingStateIncidente = 'finished'
    },
    onSetIncidente: (state, { payload }) => {
      state.incidente  = payload;
    }
  }
});

export const {
  onLoadIncidente,
  onLoadedIncidente,
  onLoadedIncidentes,
  onSetFinishedLoad,
  onDeleteIncidente,
  onSetIncidente
} = incidenteSlice.actions;
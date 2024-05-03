import { createSlice } from '@reduxjs/toolkit';
import { IBloque, IDepartamento } from '../../apps/incidentes-admin/models';

export const ubicacionSlice = createSlice({
  name: 'ubicacion',
  initialState: {
    loadingStateBloque: 'loading',
    loadingStateDepartamento: 'loading',
    bloques: {
      count: 0,
      page: 1,
      data: []
    },
    bloque: {},
    bloqueSelect: [],
    departamentos: {
      count: 0,
      page: 1,
      data: []
    },
    departamento: {},
    departamentoSelect: []
  },
  reducers: {
    // normal get
    onLoadDataBloques: (state) => {
      state.loadingStateBloque = 'loading';
    },
    onLoadDataDepartamentos: (state) => {
      state.loadingStateDepartamento = 'loading';
    },
    onLoadedDataBloques: (state, { payload }) => {
      state.bloques = payload;
      state.loadingStateBloque = 'finished'
    },
    onLoadedDataDepartamentos: (state, { payload }) => {
      state.departamentos = payload;
      state.loadingStateDepartamento = 'finished'
    },
    // get select
    onLoadedDataBloqueSelect: (state, { payload }) => {
      state.bloqueSelect = payload
    },
    onLoadedDataDepartamentoSelect: (state, { payload }) => {
      state.departamentoSelect = payload
    },
    // normal get but by state not by api
    onLoadedDataBloque: (state, { payload }) => {
      state.bloque = payload;
    },
    onLoadedDataDepartamento: (state, { payload }) => {
      state.departamento = payload;
    },
    // delete
    onDeleteDataBloque: (state, { payload }) => {
      state.bloques.data = state.bloques.data.filter((val: IBloque) => val.id !== payload);
      state.loadingStateBloque = 'finished';
    },
    onDeleteDataDepartamento: (state, { payload }) => {
      state.departamentos.data = state.departamentos.data.filter((val: IDepartamento) => val.id !== payload);
      state.loadingStateDepartamento = 'finished';
    }
  }
});

export const {
  onLoadDataBloques,
  onLoadDataDepartamentos,
  onLoadedDataBloques,
  onLoadedDataDepartamentos,
  onLoadedDataBloqueSelect,
  onLoadedDataDepartamentoSelect,
  onLoadedDataBloque,
  onLoadedDataDepartamento,
  onDeleteDataBloque,
  onDeleteDataDepartamento
} = ubicacionSlice.actions;
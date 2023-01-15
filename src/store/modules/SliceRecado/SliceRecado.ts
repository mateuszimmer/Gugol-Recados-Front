import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRecado, IResposta } from '../../../interfaces';
import { recadosService } from '../../../services';

export const adicionarRecadoThunk = createAsyncThunk<IResposta, Partial<IRecado>>('/recado/novo', async (recado) => {
    const response = await recadosService.cadastraRecado(recado)
    return response
})

export const alterarRecadoThunk = createAsyncThunk<IResposta, IRecado>('/recado/alterar/', async (recadoAlterado) => {
    const response = await recadosService.alteraRecado(recadoAlterado)
    return response
})

const SliceRecado = createSlice({
    name: 'recado',
    initialState: {} as IResposta,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(adicionarRecadoThunk.fulfilled, (state, action) => {
                const { success, message, data } = action.payload
                state.data = data
                state.message = message
                state.success = success
            })
            .addCase(alterarRecadoThunk.fulfilled, (state, action) => {
                const { success, message, data } = action.payload
                state.data = data
                state.message = message
                state.success = success
            })
    }
})

export default SliceRecado.reducer
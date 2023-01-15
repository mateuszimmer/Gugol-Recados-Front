import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IRecado, IResposta } from '../../../interfaces';
import { IDadosGetRecados } from '../../../interfaces/IDadosGetRecados';
import { recadosService } from '../../../services';

export const obterRecadosDoUsuarioThunk = createAsyncThunk<IResposta, IDadosGetRecados>('/recado/obter/', async (dataSend) => {
    const response = await recadosService.userGetRecados(dataSend)
    return response
})

const SliceRecados = createSlice({
    name: 'recados',
    initialState: {} as IResposta,
    reducers: {
        atualizaRecados(state, action: PayloadAction<IRecado>){
            const indice = state.data.findIndex((recado: IRecado) => recado.id === action.payload.id)
            state.data[indice] = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(obterRecadosDoUsuarioThunk.fulfilled, (state, action) => {
                const { success, message, data } = action.payload
                state.data = data
                state.message = message
                state.success = success
            })
    }
})

export const { atualizaRecados } = SliceRecados.actions

export const { data } = SliceRecados.getInitialState()

export default SliceRecados.reducer
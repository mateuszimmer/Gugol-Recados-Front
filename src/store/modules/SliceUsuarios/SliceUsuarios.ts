import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../../services';
import { IUsuario, IResposta } from '../../../interfaces';

export const loginUsuarioThunk = createAsyncThunk<IResposta, Partial<IUsuario>>('/usuario/logar/', async (user) => {
        const response = await userService.getUser(user)
        return response
    })

export const logoutUsuarioThunk = createAsyncThunk<IResposta, string>('/logout', async (id) => {
        const response = await userService.logoutUser(id)
        return response
    })

export const verificaUsuarioLogadoThunk = createAsyncThunk<IResposta, string>('/verificaUsuarioLogado',
    async (id) => {
        const response = await userService.verificaUsuarioLogado(id)
        return response
    })

const SliceUsuario = createSlice({
    name: 'usuarioLogado',
    initialState: {} as IResposta,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginUsuarioThunk.fulfilled, (state, action) => {
            const { success, message, data } = action.payload
            state.data = data
            state.message = message
            state.success = success
        })
        builder.addCase(logoutUsuarioThunk.fulfilled, (state, action) => {
            const { success, message, data } = action.payload
            state.data = data
            state.message = message
            state.success = success
        })       
        builder.addCase(verificaUsuarioLogadoThunk.fulfilled, (state, action) => {
            const { success, message, data } = action.payload
            state.data = data
            state.message = message
            state.success = success
        })       
    },
})

export default SliceUsuario.reducer
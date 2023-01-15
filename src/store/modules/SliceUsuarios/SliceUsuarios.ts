import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../../services';
import { IUsuario, IResposta } from '../../../interfaces';

export const loginUsuarioThunk = createAsyncThunk<IResposta, Partial<IUsuario>>('/usuario/logar/', async (user) => {
        return await userService.getUser(user)
    })

export const logoutUsuarioThunk = createAsyncThunk<IResposta, string>('/logout', async (id) => {
        return await userService.logoutUser(id)
    })

export const verificaUsuarioLogadoThunk = createAsyncThunk<IResposta, string>('/verificaUsuarioLogado',
    async (id) => {
        return await userService.verificaUsuarioLogado(id)
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
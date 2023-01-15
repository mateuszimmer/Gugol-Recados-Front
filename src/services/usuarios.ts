import { IResposta } from "../interfaces/IResposta";
import { IUsuario } from "../interfaces/IUsuario";
import { api } from "./index";

class UsuarioDataService {
    async cadastraUsuario(usuario: IUsuario) {
        try {
            const response = await api.post('/cadastro/', usuario)
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    async getUser(usuario: Partial<IUsuario>) {
        try {
            const response = await api.post('/logar/', usuario)
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    async logoutUser(id: string) {
        try {
            const response = await api.delete(`/logout/${id}`)
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    async verificaUsuarioLogado(id: string) {
        try {
            return (await api.get(`/usuarioLogado/${id}`)).data
        } catch (error: any) {
            return error.response.data
        }
    }
}

const userService = new UsuarioDataService()

export { userService }
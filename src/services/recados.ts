import { IDadosGetRecados } from '../interfaces/IDadosGetRecados'
import { IRecado } from '../interfaces/IRecado'
import { api } from './index'

class RecadosDataService {
    async userGetRecados(dados: IDadosGetRecados) {
        const { id, visivel, titulo } = dados
        try {
            const response = await api.get(`/recados/${id}?visivel=${visivel}${titulo?`&titulo=${titulo}`:''}`)
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    async cadastraRecado(novoRecado: Partial<IRecado>) {
        try {
            const response = await api.post('/recados/novorecado',
                {
                    // Quando refatorar, tentar melhorar
                    titulo: novoRecado.titulo,
                    descricao: novoRecado.descricao,
                    data: novoRecado.data,
                    usuario: novoRecado.usuario,
                })
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    async alteraRecado(recadoAlterado: IRecado) {
        try {
            const response = await api.put('/recados',
                {
                    // Quando refatorar, tentar melhorar
                    id: recadoAlterado.id,
                    titulo: recadoAlterado.titulo,
                    descricao: recadoAlterado.descricao,
                    data: recadoAlterado.data,
                    usuario: recadoAlterado.usuario,
                    visivel: recadoAlterado.visivel,
                    ativo: recadoAlterado.ativo
                })
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }
}

const recadosService = new RecadosDataService()

export { recadosService }
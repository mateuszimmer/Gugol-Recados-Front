import React, { useEffect } from "react";
import MeuHeader from "../../componets/MeuHeader/MeuHeader";
import { Button, Container, Grid, TextField , Paper, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { IRecado } from "../../interfaces/IRecado";
import { v4 as uuid } from "uuid";
import { adicionarRecadoThunk } from "../../store/modules/SliceRecado/SliceRecado";

function verificaInputs(titulo: string, descricao: string, data: string) {

    if(titulo === '' || data === '' || descricao === '') {
        alert('Todos os campos devem ser preenchidos')
        return false
    }
    return true
}

const NovoRecado: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const keyTemp: string = useAppSelector(state => state.usuarioLogado.data)

    useEffect(()=>{
        // if(!getUsuarioLogado()) navigate("/")
    },[])

    // const usuarioLogado = getUsuarioLogado() || ''

    const [ titulo, setTitulo ] = useState<string>('')
    const [ descricao, setDescricao ] = useState<string>('')
    const [ data, setData ] = useState<string>('')
    
    async function cadastraRecado() {
        if(!verificaInputs(titulo, descricao, data)) return

        const novoRecado: Partial<IRecado> = {
            titulo,
            descricao,
            data,
            usuario: keyTemp,
        }

        await dispatch(adicionarRecadoThunk(novoRecado))
        navigate('/recados')
    }

    function nextInput(e: any, id?: string) {
        const { key } = e
        if(key === 'Enter' || key === 'Tab'){
            e.preventDefault()
            if(id){
                const newInput = document.querySelector(`#${id}`)
                // @ts-ignore
                if(newInput) newInput.focus()
            } else {
                cadastraRecado()
            }

        }
    }

    return (
        <>
            <MeuHeader sair />
            <Container sx={{marginTop: 3}}>
                <Grid container display={'flex'} justifyContent={'center'}>
                    <Grid item sm={8} md={5} lg={5}>
                        <Paper sx={{padding: 2}} elevation={7}>
                            <div>
                                <Typography 
                                    variant='h6' 
                                    margin='normal' 
                                    textAlign={'center'}
                                >
                                    Cadastrar novo Recado:
                                </Typography>

                                <TextField 
                                    id='id-titulo'
                                    margin='dense' 
                                    variant='outlined' 
                                    label='Titulo' 
                                    type='string' 
                                    value={titulo} 
                                    onChange={event=>setTitulo(event.target.value)} 
                                    fullWidth
                                    onKeyDown={e=>nextInput(e, 'id-data')}
                                />

                                <TextField
                                    id='id-data'
                                    margin='dense' 
                                    variant='outlined' 
                                    type='date' 
                                    value={data} 
                                    onChange={event=>setData(event.target.value)} 
                                    fullWidth
                                    onKeyDown={e=>nextInput(e, 'id-descricao')}
                                />

                                <TextField 
                                    id='id-descricao'
                                    margin='dense'
                                    variant='outlined'
                                    label='Descrição'
                                    type='string'
                                    value={descricao}
                                    onChange={event=>setDescricao(event.target.value)}
                                    multiline
                                    rows={5}
                                    fullWidth
                                    onKeyDown={e=>nextInput(e)}
                                />

                                <Grid 
                                    item 
                                    margin={2} 
                                    display={'flex'} 
                                    justifyContent={'space-between'}
                                
                                >
                                    <Button 
                                        id='id-botao-voltar'
                                        variant='outlined'
                                        color='secondary'
                                        onClick={()=>navigate('/recados')}
                                    >
                                        Voltar
                                    </Button>

                                    <Button 
                                        id='id-botao-salvar'
                                        variant='contained'
                                        color='secondary'
                                        onClick={()=>cadastraRecado()}
                                    >
                                        Salvar recado
                                    </Button>

                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default NovoRecado;
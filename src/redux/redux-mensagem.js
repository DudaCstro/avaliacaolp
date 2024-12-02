import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../service/service-mensagem.js";
import ESTADO from "./redux-estado.js";

export const consultarMensagem = createAsyncThunk('consultarMensagem', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta.listaMensagens)) {
            return {
                status: true,
                listaMensagens: resposta.listaMensagens
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem,
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem,
        };
    }
});
export const gravarMensagem = createAsyncThunk('gravarMensagem', async (mensagem) => {
    try {
        const resposta = await gravar(mensagem);
        if (resposta.status) {
            mensagem.id = resposta.id;
            return {
                status: true,
                mensagem: resposta.mensagem,
                mensagem
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});
export const deletarMensagem = createAsyncThunk('deletarMensagem', async (mensagem) => {
    try {
        const resposta = await deletar(mensagem);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                mensagem
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});
export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (mensagem) => {
    try {
        const resposta = await atualizar(mensagem);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                mensagem
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
}); 

const mensagemReducer = createSlice({
    name: 'mensagem',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaMensagens: []
    },
    reducers: {
        limpaMensagem: (state) => {
            state.mensagem = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(consultarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarMensagem.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaMensagens = action.payload.listaMensagens;
            })
            .addCase(consultarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(gravarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaMensagens.push(action.payload.mensagem);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(deletarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição deletar...";
            })
            .addCase(deletarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaMensagens = state.listaMensagens.filter((mensagem) => mensagem.id !== action.payload.mensagem.id);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(atualizarMensagem.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualizar...";
            })
            .addCase(atualizarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaMensagens.findIndex((mensagem) => mensagem.id === action.payload.mensagem.id);
                    if (indice !== -1) {
                        state.listaMensagens[indice] = action.payload.mensagem;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
        }
});

export const { limpaMensagem } = mensagemReducer.actions;
export default mensagemReducer.reducer;

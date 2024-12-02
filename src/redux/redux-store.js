import { configureStore } from "@reduxjs/toolkit";
import reduxUsuarios from "./redux-usuario.js";
import reduxMensagens from './redux-mensagem.js';

const store = configureStore({
    reducer: {
        usuarios: reduxUsuarios,
        mensagens: reduxMensagens
    }
});

export default store;

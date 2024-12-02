import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tela404 from "./component/tela/Tela.404";
import TelaMain from "./component/telas/telaMain"
import TelaBatePapo from "./component/tela/TelaBatePapo"
import TelaCadastroUsuario from "./component/tela/telaCadastroUsuario";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/avaliacaolp" element={<TelaMain />} />
                    <Route path="/avaliacaolp/usuario" element={<TelaCadastroUsuario />} />
                    <Route path="/avaliacaolp/mensagem" element={<TelaBatePapo />} />
                    <Route path="*" element={<Tela404/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastro from "../forms/formCadastro.jsx"
import TabelaUsuarios from "../tabela/tabelaUsuarios.jsx"

export default function TelaCadastroUsuario() {
    const [exibirUsuarios, setExibirUsuarios] = useState(true);

    return (
        <Pagina>
            <Alert className="mt-4 mb-02 success text-center" variant="dark">
                <h2>
                    Cadastro de Usuário
                </h2>
            </Alert>
            {
                exibirUsuarios ?
                    <TabelaUsuarios
                        setExibirUsuarios={setExibirUsuarios}
                    />
                    :
                    <FormCadastro
                        setExibirUsuarios={setExibirUsuarios}
                    />
            }
        </Pagina>
    );
}
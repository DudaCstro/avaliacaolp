import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) {
    return (
        <Container className="w-100">
            <Cabecalho titulo="Prova LP2 2 bimestre" />
            <Menu />
            {props.children}
        </Container>
    );
}
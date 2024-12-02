import { Form, Button, Spinner, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { gravarUsuario, limpaMensagem } from "../../redux/redux-usuario.js";
import ESTADO from "../../redux/redux-estado.js";

export default function FormCadastro(props) {
    let { estado, mensagem } = useSelector((state) => state.usuarios);
    const dispatch = useDispatch();
    const [carregando, setCarregando] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [resetUsuario] = useState({
        id: "",
        nickname: "",
        urlAvatar: "",
        dataIngresso: "",
        senha: ""
    });
    const [usuario, setUsuario] = useState(resetUsuario);

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(limpaMensagem());
            setUsuario(resetUsuario);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(limpaMensagem());
        }
    }, [estado, mensagem, props, resetUsuario, dispatch]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            setCarregando(true);
            dispatch(gravarUsuario(usuario));
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <Container className="w-50">
            <Form className="mb-4" noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                        type="text"
                        placeholder="Carlinhos123"
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o seu nickname.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Url da Imagem</Form.Label>
                    <Form.Control
                        required
                        id="urlAvatar"
                        name="urlAvatar"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                        type="url"
                        placeholder="URL do avatar"
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a url.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Data de Ingresso</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        id="dataIngresso"
                        name="dataIngresso"
                        value={usuario.dataIngresso}
                        onChange={manipularMudanca}
                        placeholder="01/02/2024"
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, selecione a Data de Ingresso!
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                        type="password"
                        placeholder="..."
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe sua senha!
                    </Form.Control.Feedback>
                </Form.Group>


                <Row className="mt-2 mb-2">
                    <Col md={2}>
                        <Button disabled={carregando} type="submit" variant="success">
                            {carregando ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Processando...
                                </>
                            ) : (
                                "Confirmar"
                            )}
                        </Button>
                    </Col>
                    <Col>
                        <Button disabled={carregando} type="button" variant="success"
                            onClick={() => {
                                setUsuario(resetUsuario);
                                props.setExibirUsuarios(true);
                            }}
                        >
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

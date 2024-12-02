import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand as={Link} to="/avaliacaolp">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Opções" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/avaliacaolp/usuario">Usuarios</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/avaliacaolp/mensagem">Bate-Papo</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

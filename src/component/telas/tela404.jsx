import Pagina from '../layouts/Pagina'
import imagem404 from '../assets/error-404.jpg'

export default function Tela404() {
    return (
        <Pagina>
            <img src={imagem404} alt="Erro 404" />
        </Pagina>
    );
}
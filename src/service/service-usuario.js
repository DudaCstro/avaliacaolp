const url = 'http://localhost:5000/mensagem/'

export async function gravar(mensagem) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem)
    });
    return await res.json();
}

export async function deletar(mensagem) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem)
    });
    return await res.json();
}

export async function atualizar(mensagem) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem)
    });
    return await res.json();
}

export async function consultar(termo) {
    if (!termo)
        termo = "";
    const res = await fetch(url + termo, {
        method: 'GET',
    });
    return await res.json();
}

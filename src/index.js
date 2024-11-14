const apiUrl = 'https://ecom-back-strapi.onrender.com/api/products';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwOTI2OTYzLCJleHAiOjE3MzM1MTg5NjN9.5oZdqaREzoAKCTKiXINGqQj32g50S0KoXmSKAf5FJhI';

// Função para configurar os cabeçalhos de autenticação
function configurarCabecalhos() {
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
}

// Função para buscar os produtos da API
async function buscarProdutos() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: configurarCabecalhos()
        });

        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.status);
        }

        const data = await response.json();
        return data.data; // Retorna os produtos
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return null; // Em caso de erro
    }
}

// Função para criar o elemento HTML para cada produto
function criarElementoProduto(produto) {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');

    const nomeProduto = document.createElement('h2');
    nomeProduto.textContent = produto.attributes.nome;
    produtoDiv.appendChild(nomeProduto);

    const precoProduto = document.createElement('p');
    precoProduto.textContent = `Preço: R$ ${produto.attributes.preco.toFixed(2)}`;
    produtoDiv.appendChild(precoProduto);

    const descricaoProduto = document.createElement('p');
    descricaoProduto.textContent = produto.attributes.descricao;
    produtoDiv.appendChild(descricaoProduto);

    // Verifica se há imagem do produto na API
    if (produto.attributes.imagem && produto.attributes.imagem.data) {
        const imagemUrl = 'https://ecom-back-strapi.onrender.com' + produto.attributes.imagem.data.attributes.url;
        const imagemProduto = document.createElement('img');
        imagemProduto.src = imagemUrl;
        imagemProduto.alt = produto.attributes.nome;
        imagemProduto.classList.add('produto-imagem');
        produtoDiv.appendChild(imagemProduto);
    }

    // Criar o botão de compra
    const botaoCompra = document.createElement('button');
    botaoCompra.textContent = 'Comprar';
    botaoCompra.onclick = () => {
        alert(`Você comprou: ${produto.attributes.nome}`);
    };
    produtoDiv.appendChild(botaoCompra);

    return produtoDiv;
}

// Função para renderizar os produtos na página
function renderizarProdutos(produtos) {
    const produtosDiv = document.getElementById('produtos');
    produtosDiv.innerHTML = ''; // Limpa a área dos produtos antes de renderizar

    produtos.forEach(produto => {
        const produtoDiv = criarElementoProduto(produto);
        produtosDiv.appendChild(produtoDiv);
    });
}

// Função principal para carregar e exibir os produtos
async function carregarProdutos() {
    const produtos = await buscarProdutos();
    if (produtos) {
        renderizarProdutos(produtos);
    } else {
        console.error('Nenhum produto foi encontrado.');
    }
}

// Carrega os produtos ao carregar a página
window.onload = carregarProdutos;

// Função para alterar a cor dos botões no cabeçalho
function clicarBotao(botao) {
    const botaoCampinho = document.getElementById('btn-campinho');
    const botaoOfertas = document.getElementById('btn-ofertas');
    const botaoDescontos = document.getElementById('btn-descontos');

    // Resetando as cores
    botaoCampinho.style.backgroundColor = '#ccc';
    botaoOfertas.style.backgroundColor = '#ccc';
    botaoDescontos.style.backgroundColor = '#ccc';

    // Alterando a cor do botão clicado
    if (botao === 'campinho') {
        botaoCampinho.style.backgroundColor = 'green';
        window.location.href = 'https://www.campinhodigital.org/';
    } else if (botao === 'ofertas') {
        botaoOfertas.style.backgroundColor = 'pink';
    } else if (botao === 'descontos') {
        botaoDescontos.style.backgroundColor = 'purple';
        abrirModal(); // Abre o modal
    }
}

// Função para abrir o modal
function abrirModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Prevenção do envio do formulário para não recarregar a página
document.getElementById('form-descontos').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulário enviado! Você está inscrito para receber descontos.');
    fecharModal(); // Fecha o modal após o envio
});

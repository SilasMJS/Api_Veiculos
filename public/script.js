async function carregarVeiculos(){
    const ordenacoes = document.querySelectorAll('input[name="ordenar"]')
    let ordenar
    
    let opcoes = document.getElementById('ordenar-opt')
    
    const lista = document.getElementById('exibir-veiculos')
    lista.innerHTML = ''
    const container_veiculo = document.getElementById('botao')
    let visivel = false
    
    container_veiculo.addEventListener('click', async () =>{
        let url = 'http://localhost:8000/veiculos'
        if (visivel == false){

            ordenacoes.forEach(radio =>{
                if (radio.checked){
                    ordenar = radio.id
                }
            })
            
            const opcao = opcoes.value

            if(ordenar && opcao!== undefined && opcao !== ''){
                url += `?order=${ordenar}&opc=${opcao}`
            } 
            else if(ordenar !== undefined){
                url += `?order=${ordenar}&opc=nome`
            }

            const response = await axios.get(url)
            const veiculos = response.data
            veiculos.forEach(veiculo => {
                const item = document.createElement('li')
                item.classList.add('veiculo')
                item.innerText = `Id: ${veiculo.id}
                Nome: ${veiculo.nome}
                Ano de Fabricação: ${veiculo.ano_fabricacao}
                Ano do Modelo: ${veiculo.ano_modelo}
                Valor: ${veiculo.valor}
                \n`

                lista.appendChild(item)
            });
            visivel = true
        }
        else{
            lista.innerHTML = ''
            visivel = false
        }
    })

}

function cadastrarVeiculos(){
    const cont_cad_veiculos = document.getElementById('botao-cad')
    const nome = document.getElementById('nome')
    const ano_fabricacao = document.getElementById('ano-fabricacao')
    const ano_modelo = document.getElementById('ano-modelo')
    const preco = document.getElementById('preco')

    cont_cad_veiculos.addEventListener('click', async () =>{
        const nome_veiculo = nome.value
        const a_fab_veiculo = parseInt(ano_fabricacao.value)
        const a_modelo_veiculo = parseInt(ano_modelo.value)
        const preco_veiculo = parseFloat(preco.value)

        await axios.post('http://localhost:8000/veiculos',{
            nome: nome_veiculo,
            ano_fabricacao: a_fab_veiculo,
            ano_modelo: a_modelo_veiculo,
            valor: preco_veiculo
        })

        console.log('Cadastrado com sucesso')

    })
        
    
}

function atualizarVeiculo(){
    const botao = document.getElementById('botao-put')
    const id_veiculo = document.getElementById('id-atualizar')
    const nome = document.getElementById('nome')
    const ano_fabricacao = document.getElementById('ano-fabricacao')
    const ano_modelo = document.getElementById('ano-modelo')
    const preco = document.getElementById('preco')


    botao.addEventListener('click', async (event) =>{
        event.preventDefault()
        const id_atualizar = parseInt(id_veiculo.value)
        const nome_put = nome.value
        const ano_fabricacao_put = parseInt(ano_fabricacao.value)
        const ano_modelo_put = parseInt(ano_modelo.value)
        const preco_put = parseFloat(preco.value)

        await axios.put(`http://localhost:8000/veiculos/${id_atualizar}`,{
            nome: nome_put,
            ano_fabricacao: ano_fabricacao_put,
            ano_modelo: ano_modelo_put,
            valor: preco_put
        })
    })

}

async function removerVeiculo(){
    const botao = document.getElementById('botao-del')
    const id_veiculo = document.getElementById('id-veiculo')
    botao.addEventListener('click', async (event) => {
        event.preventDefault()
        const id_remover = parseInt(id_veiculo.value)
        await axios.delete(`http://localhost:8000/veiculos/${id_remover}`)
        console.log('removido com sucesso')
    })
}


function app(){
    carregarVeiculos()
    cadastrarVeiculos()
    atualizarVeiculo()
    removerVeiculo()
}

app()
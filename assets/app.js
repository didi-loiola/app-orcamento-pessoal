class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
            return true
        }
    }
}

class BD {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let despesas = Array()
        let id = localStorage.getItem('id')
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            if (despesa !== null) {
                despesas.push(despesa)
            }
        }

        return despesas
    }
}

let bd = new BD()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    if (despesa.validarDados()) {
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')
    } else {
        document.getElementById('voltar').classList.add('btn-danger')
        document.getElementById('voltar').textContent = 'Voltar e Corrigir'
        document.getElementById('sucesso').classList.add('text-danger')
        document.getElementById('staticBackdropLabel').textContent = 'Erro na Gravação!'
        document.getElementsByClassName('modal-body')[0].innerText = 'Existem campos obrigatórios que não foram preenchidos'
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas() {
    let despesas = Array()
    let listaDespesas = document.getElementById('listaDespesas')
    despesas = bd.recuperarTodosRegistros()

    despesas.forEach(function(d) {
        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                break
            case '2':
                d.tipo = 'Educação'
                break
            case '1':
                d.tipo = 'Lazer'
                break
            case '1':
                d.tipo = 'Saúde'
                break
            case '1':
                d.tipo = 'Transporte'
                break
        }
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
    console.log(despesas)
}


{
    /* <tr>
        <td>15/08/2022</td>
        <td>Alimentação</td>
        <td>Compras do Mês</td>
        <td>445</td>
    </tr> */
}
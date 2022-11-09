const button = document.querySelector('#btnReceita')
const popup = document.querySelector('#popup')
const tirarLinhaS = document.querySelector('#tirarLinhaS');
const tirarLinhaN = document.querySelector('#tirarLinhaN');
const selecionaLinhas = document.querySelector('#selecionaLinhas');

var dados;

tirarLinhaS.addEventListener('click', () => {
    selecionaLinhas.style.display = 'block'
})

tirarLinhaN.addEventListener('click', () => {
    selecionaLinhas.style.display = 'none'
})

button.addEventListener('click', () => {
    popup.style.display = 'block'
})

popup.addEventListener('click', event => {
    const classNameOfClickedELement = event.target.classList[0]
    const classNames = ['popup-close', 'popup-submit', 'popup-wrapper']
    if(classNames.some(className => className === classNameOfClickedELement)){
        popup.style.display = 'none'
    }
    if(classNameOfClickedELement === 'popup-submit'){
        var tirarLinha = []
        var dateInit = event.target.form[0].value
        var dateFin = event.target.form[1].value
        var exportar = event.target.form[2].value
        if(event.target.form[3].checked){
            for(var i=5; i<event.target.form.length-1; i++){
                if(event.target.form[i].checked)
                tirarLinha.push(event.target.form[i].name)
            }
        }
        if(exportar === 'excel')
            exportExcel(tirarLinha, dateInit, dateFin)
    }
})

function data(json) {
    dados = json
    const anoVelho = Object.keys(json)[0]
    const anoNovo = Object.keys(json)[Object.keys(json).length-2]
    const mesVelho = Object.keys(json[anoVelho])[0]
    const mesNovo = Object.keys(json[anoNovo])[Object.keys(json[anoNovo]).length-1]
    const diaVelho = Object.keys(json[anoVelho][mesVelho])[0]
    const diaNovo = Object.keys(json[anoNovo][mesNovo])[Object.keys(json[anoNovo][mesNovo]).length-1]
    var dateVelho = String(anoVelho + "-" + addZeroes(mesVelho) + "-" + addZeroes(diaVelho))
    var dateNovo = String(anoNovo + "-" + addZeroes(mesNovo) + "-" + addZeroes(diaNovo))
    document.querySelector('#dataInit').setAttribute("min", dateVelho)
    document.querySelector('#dataInit').setAttribute("max", dateNovo)
    document.querySelector('#dateFin').setAttribute("min", dateVelho)
    document.querySelector('#dateFin').setAttribute("max", dateNovo)
    options(json)
}

function addZeroes(num) {
    var number = String(num)
    if(num < 10)
        number = "0" + number
    return number
}

function options(json){
    const arrayLinhas = []
    for(var i=0; i<Object.values(json).length; i++){
        var anoJson = Object.values(json)[i]
        for(var j=0; j<Object.values(anoJson).length; j++){
            var mesJson = Object.values(anoJson)[j]
            for(var k=0; k<Object.values(mesJson).length; k++){
                var diaJson = Object.values(mesJson)[k]
                for(var l=0; l<Object.values(diaJson).length; l++){
                    var linhaJson = Object.values(diaJson)[l]
                    if(arrayLinhas.indexOf(Object.values(linhaJson)[1]) < 0)
                        arrayLinhas.push(Object.values(linhaJson)[1])
                }
            }
        }
    }
    arrayLinhas.forEach(element => {
        var input = document.createElement('input')
        var label = document.createElement('label')
        var br = document.createElement('br')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('name', element)
        label.innerText = element
        document.querySelector('#selecaoLinhas').appendChild(input)
        document.querySelector('#selecaoLinhas').appendChild(label)
        document.querySelector('#selecaoLinhas').appendChild(br)
    })
}

function exportExcel(tirarLinha, dateInit, dateFin){
    var anoAntigo = dateInit.substring(0,4)
    var mesAntigo = dateInit.substring(5,7)
    var diaAntigo = dateInit.substring(8,10)
    var anoNovo = dateFin.substring(0,4)
    var mesNovo = dateFin.substring(5,7)
    var diaNovo = dateFin.substring(8,10)
    var dataAntiga = new Date(anoAntigo, mesAntigo-1, diaAntigo)
    var dataNova = new Date(anoNovo, mesNovo-1, diaNovo)
    var arrayLinhas = []
    arrayLinhas.push(["Data", "Numero da Linha", "Nome da Linha", "Total de Embarque", "Receita"])
    for(var i=0; i<Object.values(dados).length; i++){
        var anoJson = Object.values(dados)[i]
        var ano = Object.keys(dados)[i]
        for(var j=0; j<Object.values(anoJson).length; j++){
            var mesJson = Object.values(anoJson)[j]
            var mes = Object.keys(anoJson)[j]
            for(var k=0; k<Object.values(mesJson).length; k++){
                var diaJson = Object.values(mesJson)[k]
                var dia = Object.keys(mesJson)[k]
                var date = new Date(ano, mes-1, dia)
                if(dataAntiga.getTime() <= date.getTime() && dataNova.getTime() >=  date.getTime()){
                    for(var l=0; l<Object.values(diaJson).length; l++){
                        var numLinha = Object.keys(diaJson)[l]
                        var contador = diaJson[numLinha].Contador
                        var linha = diaJson[numLinha].Linha
                        var receita = contador * dados.Valor
                        if(tirarLinha.indexOf(linha) == -1)
                            arrayLinhas.push([`${dia}/${mes}/${ano}`, numLinha, linha, contador, receita.toFixed(2)])
                    } 
                }
            }
        }
    }
    const CSVString = arrayLinhas.join('\n')
    var a = document.createElement('a')
    a.href = `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`
    a.download = 'receita.xls'
    a.click()
}
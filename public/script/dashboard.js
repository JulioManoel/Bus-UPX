var dadosOi
function data(json){
    var dataAtual = new Date()
    var dia = dataAtual.getDate()
    var mes = dataAtual.getMonth() + 1
    var ano = dataAtual.getFullYear()
    var dadosDia = json[ano][mes][dia];
    var passageiros = 0;
    var contador = 0;
    var onibus = Object.keys(dadosDia).length;
    for(var i=0; i<Object.keys(dadosDia).length; i++){
        passageiros += Object.values(dadosDia)[i].Passageiros
        contador += Object.values(dadosDia)[i].Contador
    }
    var valorPassagem = json.Valor
    var dinheiro = contador*valorPassagem
    document.querySelector("#passageiros").innerText = passageiros
    document.querySelector("#onibus").innerText = onibus
    document.querySelector("#contador").innerText = contador
    document.querySelector("#money-value").innerText = dinheiro.toFixed(2)
    tabela(dadosDia);
    eventListener(dadosDia, valorPassagem);
}

function tabela(dadosDia){
    for(var i=0; i<Object.keys(dadosDia).length; i++){
        var div = document.createElement("div")
        var img = document.createElement("img")
        var linha = document.createElement("p")

        div.classList.add("tabela")
        img.src = "/public/icon/busIcon.svg"
        linha.innerText = Object.values(dadosDia)[i].Linha

        div.appendChild(img)
        div.appendChild(linha)
        document.querySelector("#tabela").appendChild(div)
    }
}

function eventListener(dadosDia, valorPassagem){
    var linhas = document.querySelectorAll(".tabela");
    for (var i = 0; i < linhas.length; i++) {
        linhas[i].addEventListener("click", function (e) {
            dadosOi = dadosDia
            for(var j=0; j<Object.keys(dadosDia).length; j++){
                if(Object.values(dadosDia)[j].Linha == this.innerText){
                    var passageiros = Object.values(dadosDia)[j].Passageiros
                    var contador = Object.values(dadosDia)[j].Contador
                    var dinheiro = contador*valorPassagem
                    document.querySelector("#passageiros").innerText = passageiros
                    document.querySelector("#onibus").innerText = 1
                    document.querySelector("#contador").innerText = contador
                    document.querySelector("#money-value").innerText = dinheiro.toFixed(2)
                }
            }
        })
    }
}

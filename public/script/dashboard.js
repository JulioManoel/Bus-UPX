function data(json){
    var dataAtual = new Date()
    var dia = dataAtual.getDate()
    var mes = dataAtual.getMonth() + 1
    var ano = dataAtual.getFullYear()
    var dadosDia = json[ano][mes][dia];
    var passageiros = 0;
    var dinheiro = 0;
    var onibus = Object.keys(dadosDia).length;
    for(var i=0; i<Object.keys(dadosDia).length; i++){
        passageiros += Object.values(dadosDia)[i].Passageiros
        dinheiro += Object.values(dadosDia)[i].Contador
    }
    document.querySelector("#passageiros").innerText = passageiros
    document.querySelector("#onibus").innerText = onibus
    document.querySelector("#money-value").innerText = (dinheiro*json.Valor).toFixed(2)
    tabela(dadosDia);
}

function tabela(dadosDia){
    for(var i=0; i<Object.keys(dadosDia).length; i++){
        var div = document.createElement("div")
        var img = document.createElement("img")
        var p = document.createElement("p")

        div.classList.add("tabela")
        /*div.onclick = (dadosDia, i) => {
            var passageiros = Object.values(dadosDia)[i].Passageiros
            var dinheiro = Object.values(dadosDia)[i].Contador
            document.querySelector("#passageiros").innerText = passageiros
            document.querySelector("#onibus").innerText = 1
            document.querySelector("#money-value").innerText = (dinheiro*json.Valor).toFixed(2)
        }*/
        img.src = "/public/icon/busIcon.svg"
        p.innerText = Object.values(dadosDia)[i].Linha

        div.appendChild(img);
        div.appendChild(p)
        document.querySelector("#tabela").appendChild(div)
    }
}

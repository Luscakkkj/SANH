
function calcularPontuacao() {
    // Obter todas as respostas do formulário
    var pontuacaoTotal = 0;

    // Iterar por todos os elementos do tipo radio
    var elementosRadio = document.querySelectorAll('input[type="radio"]:checked');
    
    // Somar as pontuações
    elementosRadio.forEach(function(elemento) {
        pontuacaoTotal += parseInt(elemento.value, 10);
    });


    // Exibir o resultado
    let resultadoContainer = document.getElementById('resultContainer');
    let riscoText = document.getElementById('riscoText');
    let resultElement = document.getElementById('riscoText')


    if (pontuacaoTotal >= 12) {
        riscoText.textContent = 'Estado nutricional normal';
        resultElement.style.color ='green'
        resultElement.style.fontWeight = 'bold'
        resultElement.style.fontSize = '1.2rem'

    } else if (pontuacaoTotal >= 8) {
        riscoText.textContent = 'Sob risco de desnutrição';
        resultElement.style.color ='orange'
        resultElement.style.fontWeight = 'bold'
        resultElement.style.fontSize = '1.2rem'

    } else {
        riscoText.textContent = 'Desnutrido';
        resultElement.style.color ='red'
        resultElement.style.fontWeight = 'bold'
        resultElement.style.fontSize = '1.2rem'
    }

    console.log(pontuacaoTotal)
}

//Limpar os campos
function limparCampos() {
   
    // Limpar radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.checked = false;
    });

    // Limpar resultado e recomendações
    var resultadoElement = document.getElementById('riscoText');
    resultadoElement.textContent = '';
    resultadoElement.style.color = ''; // Resetar cor para o padrão

    document.getElementById('recomendacoes').innerHTML = '';
}
//Mostrar ajuda
function mostrarAjuda(idAjuda) {
    let ajuda = document.getElementById(idAjuda);
    ajuda.style.display = (ajuda.style.display === 'block') ? 'none' : 'block';
}


//mostrar resultado

function mostrarResultado() {
    // Obter respostas dos radio buttons
    const resposta1 = parseInt(document.querySelector('input[name="opcao1"]:checked').value);
    const resposta2 = parseInt(document.querySelector('input[name="opcao2"]:checked').value);
    const resposta3 = parseInt(document.querySelector('input[name="opcao3"]:checked').value);
    const resposta4 = parseInt(document.querySelector('input[name="opcao4"]:checked').value);

    // Calcular pontuação total
    let pontuacaoTotal = resposta1 + resposta2 + resposta3 + resposta4;

    // Determinar o resultado com base na pontuação total
    let resultado = "";
    let recomendacoes = "";
    let resultElement = document.getElementById('riscoText')

    if (pontuacaoTotal >= 4) {
        resultado = "Alto";
        resultElement.style.color ='red'
        resultElement.style.fontWeight = 600
        recomendacoes = "1. Consultar médico e nutricionista para diagnóstico nutricional completo\n2. Orientação nutricional individualizada e seguimento\n3. Iniciar suplementação oral até a conclusão do diagnóstico nutricional";

    } else if (pontuacaoTotal >= 1 && pontuacaoTotal <= 3) {
        resultado = "Médio";
        resultElement.style.color ='orange'
        resultElement.style.fontWeight = 600
        recomendacoes = "1. Consultar médico para diagnóstico completo\n2. Considerar intervenção nutricional\n3. Checar peso 2x/semana\n4. Reavaliar risco nutricional após 1 semana";

    } else {
        resultado = "Baixo";
        resultElement.style.color ='green'
        resultElement.style.fontWeight = 600
        recomendacoes = "1. Checar peso regularmente\n2. Reavaliar o risco em 1 semana";
    }

    // Exibir resultado na página
    resultElement.textContent = "Risco: " + resultado;
    document.getElementById('recomendacoes').innerHTML = "<p>" + recomendacoes.replace(/\n/g, '</p><p>') + "</p>";
}

//Limpar os campos
function limparCampos() {
    // Limpar campos de data e diagnóstico
    document.getElementById('date').value = '';
    document.getElementById('diagnostico').value = '';

    // Limpar radio buttons
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.checked = false;
    });

    // Limpar resultado e recomendações
    var resultadoElement = document.getElementById('riscoText');
    resultadoElement.textContent = '';
    resultadoElement.style.color = ''; // Resetar cor para o padrão

    document.getElementById('recomendacoes').innerHTML = '';
}
    

    


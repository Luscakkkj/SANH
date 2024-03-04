//Mostrar ajuda
function mostrarAjuda(idAjuda) {
    let ajuda = document.getElementById(idAjuda);
    ajuda.style.display = (ajuda.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de evento de clique ao botão "Calcular Resultado"
    document.querySelector('.acao').addEventListener('click', function () {
        // Obtém as respostas selecionadas da primeira etapa
        const resposta1 = document.querySelector('input[name="opcao1"]:checked').value;
        const resposta2 = document.querySelector('input[name="opcao2"]:checked').value;
        const resposta3 = document.querySelector('input[name="opcao3"]:checked').value;
        const resposta4 = document.querySelector('input[name="opcao4"]:checked').value;
        const button = document.querySelector('.acao')
        // Obtém a div de resultado
        const resultContainer = document.getElementById('resultContainer');

        // Limpa qualquer conteúdo anterior
        resultContainer.innerHTML = '';

        // Lógica para verificar as condições
        if (resposta1 === 'sim' || resposta2 === 'sim' || resposta3 === 'sim' || resposta4 === 'sim') {
            // Se pelo menos uma resposta for "sim", exibe a segunda etapa
            button.style.display = 'none'
            resultContainer.innerHTML = `
            <h2>Etapa 2: Estado Nutricional e Gravidade da Doença</h2>
        
            <div class="question">
                <div class="pergunta">
                    <p>Estado Nutricional:</p>
                </div>
                <label>
                    <input type="radio" name="estadoNutricional" value="ausente"> Ausente
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-estado-nutricional')"></i><br>
                </label>
                <div id="ajuda-estado-nutricional" class="ajuda-conteudo">
                    Estado Nutricional Normal 
                </div>
                
                <label>
                    <input type="radio" name="estadoNutricional" value="leve"> Leve
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-estado-nutricional2')"></i><br>
                </label>
                <div id="ajuda-estado-nutricional2" class="ajuda-conteudo">
                    VPP > 5% em 3 meses ou 
                    ingesta alimentar na última 
                    semana 50-75% das 
                    necessidades nutricionais
                </div>
                
                <label>
                    <input type="radio" name="estadoNutricional" value="moderado"> Moderado
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-estado-nutricional3')"></i><br>
                </label>
                <div id="ajuda-estado-nutricional3" class="ajuda-conteudo">
                    VPP > 5% em 2 meses ou 
                    ingesta alimentar na última 
                    semana 25-60% das 
                    necessidades nutricionais ou 
                    IMC 18,5 – 20,5 com 
                    condição geral 
                    enfraquecida
                </div>
                <label>
                    <input type="radio" name="estadoNutricional" value="grave"> Grave
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-estado-nutricional4')"></i><br>
                </label>
                <div id="ajuda-estado-nutricional4" class="ajuda-conteudo">
                    VPP > 5% em 1 mês (>15% 
                    em 3 meses) ou ingesta 
                    alimentar na última semana 
                    0 – 25%% das necessidades 
                    nutricionais ou IMC < 18,5 
                    com condição geral 
                    enfraquecida            
                </div>
            </div>
        
            <div class="question">
                <div class="pergunta">
                    <p>Gravidade da Doença:</p>
                </div>
                <label>
                    <input type="radio" name="gravidadeDoenca" value="ausente"> Ausente
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-gravidade-doenca5')"></i><br>
                </label>
                <div id="ajuda-gravidade-doenca5" class="ajuda-conteudo">
                    Necessidades nutricionais normais
                </div>
                
                <label>
                    <input type="radio" name="gravidadeDoenca" value="leve"> Leve
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-gravidade-doenca6')"></i><br>
                </label>
                <div id="ajuda-gravidade-doenca6" class="ajuda-conteudo">
                    Fratura de quadril, pacientes crônicos, complicações agudas, cirrose, DPOC, hemodiálise, diabetes, oncologia, fragilidade.
                </div>
                
                <label>
                    <input type="radio" name="gravidadeDoenca" value="moderado"> Moderado
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-gravidade-doenca7')"></i><br>
                </label>
                <div id="ajuda-gravidade-doenca7" class="ajuda-conteudo">
                    Cirurgia abdominal de grande porte, fraturas, AVC, pneumonia grave, doença hematológica maligna e paciente confinado no leito
                </div>
                <label>
                    <input type="radio" name="gravidadeDoenca" value="grave"> Grave
                    <i class="fa-solid fa-circle-info" onclick="mostrarAjuda('ajuda-gravidade-doenca8')"></i><br>
                </label>
                <div id="ajuda-gravidade-doenca8" class="ajuda-conteudo">
                    Traumatismo craniano, transplante de medula óssea, paciente em terapia intensiva (APACHE > 10)
                </div>
            </div>
    
            <label>
                Idade do Paciente:
                <input type="number" name="idade" id="idade" min="0">
            </label>
            <p>Escore TOTAL: <span id="escoreTotal">___________</span></p>
            <p id="resultadoFinal"></p>`;

            // Adiciona um ouvinte de evento de clique ao botão "Calcular Resultado" da segunda etapa
            document.getElementById('calculaResultadoSegundaEtapa').addEventListener('click', function () {
                // Lógica para calcular o resultado da segunda etapa
                const pontuacoes = {
                    'ausente': 0,
                    'leve': 1,
                    'moderado': 2,
                    'grave': 3  
                };
            
                // Obtém as respostas selecionadas da segunda etapa
                const estadoNutricional = document.querySelector('input[name="estadoNutricional"]:checked');
                const gravidadeDoenca = document.querySelector('input[name="gravidadeDoenca"]:checked');
                const idade = parseInt(document.getElementById('idade').value) || 0;
            
                if (estadoNutricional && gravidadeDoenca) {
                    const pontuacaoEstadoNutricional = pontuacoes[estadoNutricional.value];
                    const pontuacaoGravidadeDoenca = pontuacoes[gravidadeDoenca.value];
                    let escoreTotal = pontuacaoEstadoNutricional + pontuacaoGravidadeDoenca;
            
                    // Adiciona 1 ponto se a idade for maior ou igual a 70
                    if (idade >= 70) {
                        escoreTotal += 1;
                    }
            
                    // Exibe o Escore Total
                    document.getElementById('escoreTotal').textContent = escoreTotal;
            
                    // Exibe o resultado final com base no Escore Total
                    const resultadoFinal = document.getElementById('resultadoFinal');
                    resultadoFinal.innerHTML = escoreTotal > 3 ? 'RISCO NUTRICIONAL' : 'SEM RISCO NUTRICIONAL';
                } else {
                    // Adicione uma lógica de tratamento caso não tenha selecionado as opções necessárias
                    alert('Por favor, selecione todas as opções antes de calcular o resultado.');
                }
            });
            document.getElementById('etapa2').style.display = 'block'; // Exibe a segunda etapa
            
        } else {
            // Se todas as respostas forem "não"
            // Verifica se há indicação de cirurgia de grande porte
            const indicacaoCirurgia = prompt("O paciente tem indicação de cirurgia de grande porte? (Digite 'sim' ou 'nao')");
            if (indicacaoCirurgia && indicacaoCirurgia.toLowerCase() === 'sim') {
                resultContainer.innerHTML = '<p>Considerar o plano de cuidado nutricional preventivo</p>';
                // Adicione aqui qualquer outra lógica ou redirecionamento necessário
            } else {
                resultContainer.innerHTML = '<p>Reavaliar o paciente semanalmente</p>';
                // Adicione aqui qualquer outra lógica ou redirecionamento necessário
            }
        }
    });
});

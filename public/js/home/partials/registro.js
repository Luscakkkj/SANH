$(document).ready(function () {

    let atual_fs, next_fs, prev_fs

    $('input[name="situacao"]').prop('checked', false);

    // Delegação de eventos para o botão "Próximo"
    $(document).on('click', '.next', function () {
        atual_fs = $(this).parent()
        next_fs = $(this).parent().next()

        $('.progress li').eq($('fieldset').index(next_fs)).addClass('active')
        atual_fs.hide(800)
        next_fs.show(800)
    });

    // Delegação de eventos para o botão "Voltar"
    $(document).on('click', '.prev', function () {
        atual_fs = $(this).parent()
        prev_fs = $(this).parent().prev()

        $('.progress li').eq($('fieldset').index(atual_fs)).removeClass('active')
        atual_fs.hide(800)
        prev_fs.show(800)
    });


    $('#idade').on('input', function () {
        // Obtém a idade do campo
        var idade = $(this).val();

        // Verifica se a idade é um número válido
        if (!isNaN(idade) && idade >= 0) {
            // Obtém a data atual
            var dataAtual = new Date();

            // Calcula o ano de nascimento subtraindo a idade do ano atual
            var anoNascimento = dataAtual.getFullYear() - idade;

            // Formata a data de nascimento no formato dd/mm/yyyy
            var dataFormatada = `${anoNascimento}-01-01`;

            // Define a data de nascimento no campo correspondente
            $('#date_nascimento').val(dataFormatada);
        }
    });
});

$('form').submit(function() {
    const outrosCheckbox = document.getElementById('outro');
    const outrosInput = document.getElementById('outros');

    if (outrosCheckbox.is(":checked")) {
        outrosCheckbox = outrosInput.value ;  
    } else {
        outrosInput.value = '';  
    }
});


//API CIDADE
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const uf = document.getElementById('uf')
const cidade = document.getElementById('city')


uf.addEventListener('change', async () => {
    const urlCity = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf.value + '/municipios'
    const request = await fetch(urlCity)
    const response = await request.json()


    let options = ''
    response.forEach((cidades) => {
        options += `<option value=${cidades.nome}>` + cidades.nome + `</option>`
    })

    cidade.innerHTML = options

})

$(window).on('load', function() {
    const antropometriaDiv = $('#antropometria');

    antropometriaDiv.html( `
        <h1> Marque a situação do paciente </h1>
        <button class="prev acao" type="button" id="prev">Voltar</button>
    `)

    $('input[name="situacao"]').change(function() {
        const antropometriaDiv = $('#antropometria');

        // Atualiza dinamicamente a seção de antropometria com base no valor do botão
        if ($('#acamado').is(":checked")) {
            antropometriaDiv.html(`
                <h2>Dados Antropométricos</h2>
                <h3>Informe as medidas corporais do Paciente</h3>
                <label>Circunferência do braço:</label><br>
                <input type="text" name="braco" id="arm" placeholder="Circunferência do braço(cm)"> <br>
                <label>Altura do Joelho:</label><br>
                <input type=text" name="joelho" id="knee" placeholder="Altura do Joelho(cm)"> <br>
                <button class="prev acao" id="prev" type="button" >Voltar</button>
                <button type="submit" class="acao enviar" id="enviar">Enviar</button>
            `);
        } else if ($('#ambulatorio').is(":checked")) {
            antropometriaDiv.html(`
                <h2>Dados Antropométricos</h2>
                <h3>Informe as medidas corporais do Paciente</h3>
                <label>Altura:</label><br>
                <input type="text" name="altura" id="altura" placeholder="Altura do Paciente"> <br>
                <label>Peso:</label><br>
                <input type="text" name="peso" id="peso" placeholder="Peso do Paciente"> <br>
                <button class="prev acao" type="button" id="prev">Voltar</button>
                <button type="submit" class="acao enviar" id="enviar">Enviar</button>
            `);
        }
    });

    
})

window.addEventListener('load', async () => {

    const request = await fetch(urlUF)
    const response = await request.json()

    const options = document.createElement("optgroup")
    options.setAttribute('label', 'UFs')
    response.forEach(function (uf) {
        options.innerHTML += '<option>' + uf.sigla + '</option>'
    })

    uf.append(options)

})

$(document).ready(function () {
    $('#tel').mask('(00)00000-0000');
})

setTimeout(function () {
    const alert = document.querySelector(".alert")
    if (alert) alert.parentNode.removeChild(alert)
}, 1300); 

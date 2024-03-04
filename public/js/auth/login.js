const inputs = document.querySelectorAll('.input')

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        // Atualizando o valor predefinido com o valor digitado pelo usuário
        input.dataset.defaultValue = input.value;

        // Atualizando a visibilidade do botão de cadastro
        updateCadastroButtonVisibility();
    });
});
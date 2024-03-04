// Selecionando os elementos
const generatePasswordButton = document.querySelector('#generate-password');
const generatedPasswordElement = document.querySelector('#generated-password');
const copyPasswordButton = document.querySelector('#copy-password');
const button = document.querySelector('#enviar')
const form = document.querySelector('#register-container');
const inputs = document.querySelectorAll('.require');
const spans = document.querySelectorAll('.span-required');
const icones = document.querySelectorAll('#icone');

// Validador Email
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;


// Funções

// Gerar letras minúsculas
const getLetterLowerCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

// Gerar letras maiúsculas
const getLetterUpperCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);

// Gerar números
const getNumber = () => Math.floor(Math.random() * 10).toString();

// Gerar símbolos
const getSymbol = () => {
	const symbols = '(){}[]@!></&$#%*=';
	return symbols[Math.floor(Math.random() * symbols.length)];
};

// Juntar todos os elementos
const generatePassword = () => {
	const generators = [
		getLetterLowerCase,
		getLetterUpperCase,
		getNumber,
		getSymbol,
	];

	const passwordLength = 10;
	let password = '';

	for (let i = 0; i < passwordLength; i++) {
		const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
		password += randomGenerator();
	}

	generatedPasswordElement.style.display = 'block';
	generatedPasswordElement.querySelector('h4').innerText = password;
};

// Eventos

// Clicar
generatePasswordButton.addEventListener('click', () => {
	generatePassword();
});

// Copiar senha
copyPasswordButton.addEventListener('click', (e) => {
	e.preventDefault();

	const password = generatedPasswordElement.querySelector('h4').innerText;

	navigator.clipboard.writeText(password).then(() => {
		copyPasswordButton.innerText = 'Senha copiada';

		setTimeout(() => {
			copyPasswordButton.innerText = 'Copiar';
		}, 1000);
	});
});


// Funções

const setErro = (index) => {
	inputs[index].style.borderBottom = '1px solid #e63636';
	spans[index].style.display = 'block';
	icones[index].style.display = 'block';
};

const removeError = (index) => {
	inputs[index].style.borderBottom = '';
	spans[index].style.display = 'none';
	icones[index].style.display = 'none';
};

// Validando o nome
const nameValidate = () => {
	if (inputs[0].value.length < 3) {
		setErro(0);
		button.style.display = 'none';
	} else {
		removeError(0);
		button.style.display = 'block';
	}
};

// Validando o email
const emailValidate = () => {
	if (!emailRegex.test(inputs[1].value)) {
		setErro(1);
		button.style.display = 'none';
	} else {
		removeError(1);
		button.style.display = 'block';
	}
};

// Validando CRN
const crnValidate = () => {
	if (inputs[2].value.length < 4) {
		button.style.display = 'none';
		setErro(2);
	} else {
		removeError(2);
		button.style.display = 'block';
	}
};

// Validando senha principal
const principalPassword = () => {
	if (inputs[3].value.length < 10) {
		setErro(3);
		button.style.display = 'none';
	} else {
		button.style.display = 'block';
		removeError(3);
		comparePassword();
	}
};

// Comparar as senhas
const comparePassword = () => {
	if (!(inputs[3].value === inputs[4].value && inputs[4].value.length >= 10)) {
		button.style.display = 'none';
		setErro(4);
	} else {
		removeError(4);
		button.style.display = 'block';
	}
};


const checkAllFieldsFilled = () => {
	const areAllFieldsFilled = Array.from(inputs).every((input) => input.value.trim() !== '');
	return areAllFieldsFilled;
};


const updateCadastroButtonVisibility = () => {
	const isAllFieldsFilled = checkAllFieldsFilled();
	const isAllFieldsValid = checkAllFieldsValid();

	if (isAllFieldsFilled && isAllFieldsValid) {
		button.style.display = 'block';
	} else {
		button.style.display = 'none';
	}
};

inputs.forEach((input) => {
	input.addEventListener('input', () => {
		updateCadastroButtonVisibility();
	});
});



inputs.forEach((input) => {
    input.addEventListener('input', () => {
        // Atualizando o valor predefinido com o valor digitado pelo usuário
        input.dataset.defaultValue = input.value;

        // Atualizando a visibilidade do botão de cadastro
        updateCadastroButtonVisibility();
    });
});


setTimeout(function () {
    const alert = document.querySelector(".alert-div")
    if (alert) {
        alert.parentNode.removeChild(alert)
    }
}, 3000)

const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const partial = document.querySelector('.partial');

function saveStateToLocalStorage() {
	const state = {
		partialActive: partial.classList.contains('active'),
		navigationActive: navigation.classList.contains('active'),
	};
	localStorage.setItem('menuState', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
	const savedState = localStorage.getItem('menuState');
	if (savedState) {
		const state = JSON.parse(savedState);
		partial.classList.toggle('active', state.partialActive);
		navigation.classList.toggle('active', state.navigationActive);
	}
}

toggle.addEventListener('click', () => {
	partial.classList.toggle('active');
	navigation.classList.toggle('active');

	saveStateToLocalStorage();
});

loadStateFromLocalStorage();

document.addEventListener('DOMContentLoaded', () => {
	document.body.classList.add('disable-transition');
});

setTimeout(() => {
	document.body.classList.remove('disable-transition');
}, 100);

history.pushState(null, null, document.URL);
window.addEventListener('popstate', () => {
	history.pushState(null, null, document.URL);
});

document.querySelector(".sair").addEventListener("click", function () {
	document.querySelector(".delete-paciente").style.display = "block";
	document.querySelector
});


document.querySelector("#cancel-delete").addEventListener("click", function () {
	document.querySelector(".delete-paciente").style.display = "none";
});
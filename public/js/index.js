// Menu mobile
const ul = document.querySelector('.ul');

function openMenu() {
	ul.classList.add('open');
}

function closeMenu() {
	ul.classList.remove('open');
}

// Animações scroll AOS
AOS.init();

// Clip card
const cards = document.querySelectorAll('.card__inner');
cards.forEach(function (card) {
	card.addEventListener('click', () => {
		card.classList.toggle('is-flipped');
	});
});

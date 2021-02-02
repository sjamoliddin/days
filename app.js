// Variables and Selectors
const navBar = document.querySelector('.nav-bar');
const navLinks = navBar.querySelectorAll('a');
const contact = navBar.querySelector('.contact a');

// Functions
function changeBackground() {
	navLinks.forEach((link, index) => {
		link.addEventListener('mouseover', () => {
			if (index === 0) {
				navBar.style.background = '#1da1f2';
				link.style.color = '#fff';
				navLinks[1].style.color = '#000';
				navLinks[2].style.color = '#000';
				contact.style.color = '#000';
			}
			if (index === 1) {
				navBar.style.background = '#FF0000';
				navLinks[0].style.color = '#000';
				link.style.color = '#fff';
				navLinks[2].style.color = '#000';
				contact.style.color = '#000';
			}
			if (index === 2) {
				navBar.style.background = '#833AB4';
				//#833AB4
				navLinks[0].style.color = '#000';
				navLinks[1].style.color = '#000';
				link.style.color = '#fff';
				contact.style.color = '#000';
			}
		});
	});

	contact.addEventListener('mouseover', () => {
		navBar.style.background = '#0a043c';
		navLinks[0].style.color = '#000';
		navLinks[1].style.color = '#000';
		navLinks[2].style.color = '#000';
		contact.style.color = '#fff';
	});
}

changeBackground();

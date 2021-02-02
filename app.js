// Variables and Selectors
const navBar = document.querySelector('.nav-bar');
const navLinks = navBar.querySelectorAll('a');
const contact = navBar.querySelector('.contact a');
const mouse = document.querySelector('.cursor');
const mouseText = mouse.querySelector('.cursor-text');
const burger = document.querySelector('.burger');
let controller;
let slideScene;
let pageScene;
let detailScene;

// Event Listeners
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);

// Functions
function cursor(e) {
	mouse.style.left = e.pageX + 'px';
	mouse.style.top = e.pageY + 'px';
}

function activeCursor(e) {
	const item = e.target;
	if ((item.id === 'logo') | item.classList.contains('burger')) {
		mouse.classList.add('nav-active');
	} else {
		mouse.classList.remove('nav-active');
	}

	if (item.classList.contains('explore')) {
		mouse.classList.add('explore-active');
		mouseText.innerText = 'Tap';
		gsap.to('title-swipe', 1, { y: '0%' });
	} else {
		mouse.classList.remove('explore-active');
		mouseText.innerText = '';
		gsap.to('title-swipe', 1, { y: '100%' });
	}
}

function changeBackground() {
	navLinks.forEach((link, index) => {
		link.addEventListener('mouseover', () => {
			// change background and color of the links
			// according to the position of them
			if (index === 0) {
				navBar.style.background = '#1da1f2';
				link.style.color = '#fff'; // change
				navLinks[1].style.color = '#000'; // reset
				navLinks[2].style.color = '#000'; // reset
				contact.style.color = '#000'; // reset
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

function animateSlides() {
	// selectors
	const slides = document.querySelectorAll('.slide');
	const nav = document.querySelector('.nav-header');

	// loop over each slide
	slides.forEach((slide, index, slides) => {
		const revealImg = slide.querySelector('.reveal-img');
		const img = slide.querySelector('img');
		const revealText = slide.querySelector('.reveal-text');

		const slideTimeline = gsap.timeline({
			defaults: { duration: 1, ease: 'power2.inOut' },
		});

		// animate images
		slideTimeline.fromTo(revealImg, { x: '0%' }, { x: '100%' });
		slideTimeline.fromTo(img, { scale: '1.5' }, { scale: '1' }, '-=1');

		//animate texts
		slideTimeline.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75');

		// animate nav-header
		slideTimeline.fromTo(nav, { y: '-200%' }, { y: '0%' }, '-=1');

		// init controller
		controller = new ScrollMagic.Controller();

		// create a slide scene
		slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.25,
			reverse: false,
		})
			.setTween(slideTimeline)
			.addTo(controller);

		// new animation, new scene
		const pageTimeline = gsap.timeline();
		let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];

		pageTimeline.fromTo(nextSlide, 1, { y: '0%' }, { y: '50%' });
		pageTimeline.fromTo(
			slide,
			1,
			{ opacity: 1, scale: 1 },
			{ opacity: 0, scale: 0.5 },
		);
		pageTimeline.fromTo(nextSlide, 1, { y: '50%' }, { y: '0%' }, '-=0.3');

		pageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: '100%',
			triggerHook: 0,
		})
			.setPin(slide, { pushFollowers: false })
			.setTween(pageTimeline)
			.addTo(controller);
	});
}

changeBackground();
animateSlides();

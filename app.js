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
let mountainScene;
let hikingScene;
let hikingPageScene;

// Event Listeners
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);
burger.addEventListener('click', navToggle);

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
		gsap.to('.title-swipe', 1, { y: '0%' });
	} else {
		mouse.classList.remove('explore-active');
		mouseText.innerText = '';
		gsap.to('.title-swipe', 1, { y: '100%' });
	}
}

function navToggle(e) {
	if (!e.target.classList.contains('active')) {
		e.target.classList.add('active');
		gsap.to('.line1', 0.5, { y: '5', rotate: '45', background: '#000' });
		gsap.to('.line2', 0.5, { y: '-5', rotate: '-45', background: '#000' });
		gsap.to('#logo', 1, { color: '#000' });
		gsap.to(navBar, 1, { clipPath: 'circle(2500px at 100% -10%)' });
		document.body.classList.add('hide');
	} else {
		e.target.classList.remove('active');
		gsap.to('.line1', 0.5, { y: '0', rotate: '0', background: '#fff' });
		gsap.to('.line2', 0.5, { y: '0', rotate: '0', background: '#fff' });
		gsap.to('#logo', 1, { color: '#fff' });
		gsap.to(navBar, 1, { clipPath: 'circle(50px at 100% -10%)' });
		document.body.classList.remove('hide');
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

	burger.addEventListener('click', () => {
		if (burger.classList.contains('active')) {
			navBar.style.background = '#fff';
			navLinks[0].style.color = '#000';
			navLinks[1].style.color = '#000';
			navLinks[2].style.color = '#000';
			contact.style.color = '#000';
		}
	});
}

// home page animations
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

// fashion page animations
function detailAnimation() {
	controller = new ScrollMagic.Controller();
	const slides = document.querySelectorAll('.detail-slide');

	slides.forEach((slide, index, slides) => {
		const slideTimeline = gsap.timeline({ defaults: { duration: 1 } });
		let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
		const nextImg = nextSlide.querySelector('img');

		slideTimeline.fromTo(nextSlide, { y: '0%' }, { y: '10%' });
		slideTimeline.fromTo(slide, { opacity: '1' }, { opacity: '0' });
		slideTimeline.fromTo(
			nextSlide,
			{ opacity: '0' },
			{ opacity: '1' },
			'-=2.1',
		);
		slideTimeline.fromTo(nextImg, { x: '50%' }, { x: '0%' });
		slideTimeline.fromTo(nextSlide, { y: '0%' }, { y: '-10%' });

		detailScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: '100%',
			triggerHook: 0,
		})
			.setPin(slide, { pushFollowers: false })
			.setTween(slideTimeline)
			.addTo(controller);
	});
}

// mountain page animations
function animateImages() {
	controller = new ScrollMagic.Controller();
	const slideTimeline = gsap.timeline({
		defaults: { duration: 1, ease: 'power2.inOut' },
	});
	const mountainText = document.querySelector('.mountain-text h1');
	const mountainImg = document.querySelector('.mountain-img');
	const mountainText2 = document.querySelector('.mountain-text p');

	slideTimeline.fromTo(mountainText, { opacity: '0' }, { opacity: '1' });
	slideTimeline.fromTo(mountainImg, { opacity: '0' }, { opacity: '1' }, '-=.4');
	slideTimeline.fromTo(
		mountainText2,
		{ opacity: '0' },
		{ opacity: '1' },
		'-=.8',
	);

	const mountainTimeline = gsap.timeline({
		defaults: { duration: 1, ease: 'power2.inOut' },
	});
	const imgs = document.querySelectorAll('.mountain-grid-img img');
	const revealImgs = document.querySelectorAll('.reveal-mountain-img');

	mountainTimeline.fromTo(revealImgs, { y: '0%' }, { y: '100%' });
	mountainTimeline.fromTo(imgs, { scale: '0.5' }, { scale: '1' }, '-=2');

	mountainScene = new ScrollMagic.Scene({
		triggerElement: revealImgs,
		imgs,
		triggerHook: 0.7,
		reverse: false,
	})
		.setTween(mountainTimeline)
		.addTo(controller);
}

// hiking page animation
function hikingAnimation() {
	controller = new ScrollMagic.Controller();
	const slides = document.querySelectorAll('.hiking-slide');

	slides.forEach((slide, index, slides) => {
		const revealImg = slide.querySelector('.reveal-img');
		const img = slide.querySelector('img');
		const revealText = slide.querySelector('.reveal-text');
		const slideTimeline = gsap.timeline({
			defaults: { duration: 1, ease: 'power2.inOut' },
		});

		slideTimeline.fromTo(revealText, { x: '0%' }, { x: '100%' });
		slideTimeline.fromTo(revealImg, { x: '0%' }, { x: '100%' }, '-=0.7');

		hikingScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0,
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

		hikingPageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: '100%',
			triggerHook: 0,
		})
			.setPin(slide, { pushFollowers: false })
			.setTween(pageTimeline)
			.addTo(controller);
	});
}

barba.init({
	views: [
		{
			namespace: 'home',
			beforeEnter() {
				animateSlides();
			},
			beforeLeave() {
				controller.destroy();
				pageScene.destroy();
				slideScene.destroy();
			},
		},
		{
			namespace: 'fashion',
			beforeEnter() {
				detailAnimation();
			},
			beforeLeave() {
				controller.destroy();
				detailScene.destroy();
			},
		},
		{
			namespace: 'mountain',
			beforeEnter() {
				animateImages();
			},
			beforeLeave() {
				controller.destroy();
				mountainScene.destroy();
			},
		},
		{
			namespace: 'hiking',
			beforeEnter() {
				hikingAnimation();
			},
			beforeLeave() {
				controller.destroy();
				hikingScene.destroy();
				hikingPageScene.destroy();
			},
		},
	],
});

changeBackground();

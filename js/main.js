import Carousel from './carousel.js';
import Masonry from './masonry.js';
import Unravel from './unravel.js';
import AutoSlide from './auto-slide.js';
import NavBarContrast from './navbar-bg-contrast.js';

$(document).ready(() => {

    const navigationBar = $('nav')[0];

    const slidesTrack = $('.carousel__slides-container')[0];
	const nextSlideButton = $('.carousel__button_right');
	const prevSlideButton = $('.carousel__button_left');

	const carousel = new Carousel(slidesTrack, nextSlideButton, prevSlideButton, 450);

	carousel.createCarouselSlidesClasses();
	carousel.createIndicators();
    carousel.positionSlides(0, carousel.slideWidth);
    carousel.addEventListeners();
    carousel.enablieAutoSlide(5555);

    // ** Masonry GRID ITEMS **

    const masonryGrid = $('.masonry-grid')[0];
 
    const masonry = new Masonry(masonryGrid);
    const unravel = new Unravel(masonryGrid, navigationBar);

    masonry.orderItemsLeftToRight();
    masonry.addEventListenerForWindowResize();

    unravel.createUnravelClasses();
    unravel.addEventListeners();
    unravel.addRating();

    const autoSlidingGrid = $('.auto-sliding-grid')[0];
    const autoSlidingGridUnravel = new Unravel(autoSlidingGrid, navigationBar);
    const autoSlide = new AutoSlide(autoSlidingGrid);

    autoSlidingGridUnravel.createUnravelClasses();
    autoSlidingGridUnravel.addEventListeners();
    autoSlidingGridUnravel.addRating();

    autoSlide.animate(7777);

    const navbarBgContrast = new NavBarContrast(slidesTrack, navigationBar, $('nav > ul > li > a'), $('nav > label > svg > rect'));

    navbarBgContrast.addWindowScrollListener();
});
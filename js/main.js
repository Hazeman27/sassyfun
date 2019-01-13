import Carousel from './carousel';
import Masonry from './masonry';
import Unravel from './unravel';
import AutoSlide from './auto-slide';

$(document).ready(() => {

    const slidesTrack = $('.carousel__slides-container')[0];
	const nextSlideButton = $('.carousel__button_right');
	const prevSlideButton = $('.carousel__button_left');

	const carousel = new Carousel(slidesTrack, nextSlideButton, prevSlideButton, 450);

	carousel.createCarouselSlidesClasses();
	carousel.createIndicators();
    carousel.positionSlides(0, carousel.slideWidth);
    carousel.addEventListeners();

    // ** Masonry GRID ITEMS **

    const masonryGrid = $('.masonry-grid')[0];
 
    const masonry = new Masonry(masonryGrid);
    const unravel = new Unravel(masonryGrid);

    masonry.orderItemsLeftToRight();
    masonry.addEventListenerForWindowResize();

    unravel.createUnravelClasses();
    unravel.addEventListeners();
    unravel.addRating();

    const autoSlidingGrid = $('.auto-sliding-grid')[0];
    const autoSlidingGridUnravel = new Unravel(autoSlidingGrid);
    const autoSlide = new AutoSlide(autoSlidingGrid);

    autoSlidingGridUnravel.createUnravelClasses();
    autoSlidingGridUnravel.addEventListeners();
    autoSlidingGridUnravel.addRating();

    autoSlide.animate(7777);
});
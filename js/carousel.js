
class Carousel {

    constructor(container, nextSlideButton, prevSlideButton, slideAnimationDuration) {

        this.slideAnimationDuration = slideAnimationDuration;
        this.slidesTrack = container;
        this.nextSlideButton = nextSlideButton;
        this.prevSlideButton = prevSlideButton;

        this.slides = Array.from(this.slidesTrack.children);
        
        this.slidesAmount = this.slides.length;
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        
		this.indicatorsList = this.slidesTrack.parentElement.appendChild(document.createElement('div'));
        this.indicators = new Array;

        this.currentSlide = null;
        this.currentSlideIndex = null;
        this.currentIndicator = null;
        this.targetSlide = null;
        this.targetSlideIndex = null;
		this.targetIndicator = null;
		
		this.targetIsOutOfBounds = false;
		this.onGoingAnimation = false;
    }

    createCarouselSlidesClasses() {

        this.slides.forEach(slide => {
            slide.classList.add('carousel__slide');
        });

        this.slides[0].classList.add('carousel__slide_current');
        this.targetSlideIndex = 0;
    }

    createIndicators() {

        this.indicatorsList.classList.add('carousel__indicators');

        for (let i = 0; i < this.slidesAmount; i++)
            this.indicators.push(document.createElement('div'));
    
        this.indicators.forEach((indicator) => {

            indicator.classList.add('carousel__indicator');
            this.indicatorsList.appendChild(indicator);
        });
    
        this.indicators[0].classList.add('carousel__indicator_current');
    }

    positionSlides(currentSlideIndex, slideWidth) {

        for (let i = 0; i < this.slidesAmount; i++) {

            if (i == currentSlideIndex) {
                
                this.slides[currentSlideIndex].style.left = 0 + 'px';
                continue;
            }

            this.slides[i].style.left = slideWidth + 'px';
        }
    }
    
    reassignCurrentSlide() {
    
        this.currentSlide.classList.remove('carousel__slide_current');
        this.targetSlide.classList.add('carousel__slide_current');
        
        this.currentIndicator.classList.remove('carousel__indicator_current');
        this.targetIndicator.classList.add('carousel__indicator_current');
    }

    moveToSlide() {

        this.targetSlideIndex = this.slides.findIndex(slide => slide === this.targetSlide);
        this.currentSlideIndex = this.slides.findIndex(slide => slide === this.currentSlide);
    
        if ((this.targetSlideIndex > this.currentSlideIndex)
                && !this.targetIsOutOfBounds || this.targetIsOutOfBounds && this.targetSlideIndex == 0) {
        
            this.targetSlide.style.left = this.slideWidth + 'px';
            imagesLoaded(this.slides, this.animate('-='));
        }
        else if ((this.targetSlideIndex < this.currentSlideIndex)
                && !this.targetIsOutOfBounds || this.targetIsOutOfBounds && this.targetSlideIndex == this.slidesAmount - 1) {

            this.targetSlide.style.left = -this.slideWidth + 'px';
            imagesLoaded(this.slides, this.animate('+='));
        }

        this.reassignCurrentSlide();
    }

    animate(direction) {

        this.onGoingAnimation = true;

        $(this.currentSlide).animate({
            left: direction + this.slideWidth
        },
        {
            duration: this.slideAnimationDuration,
            easing: 'swing',
            start: () => {
                $(this.targetSlide).animate({
                    left: direction + this.slideWidth
                },
                {
                    duration: this.slideAnimationDuration,
                    easing: 'swing',
                    complete: () => {
                        this.currentSlide.style.left = this.slideWidth + 'px';
                        this.onGoingAnimation = false;
                    }
                });
            }
        });
    }

    enablieAutoSlide(delay) {

        setInterval(() => {
            $(this.nextSlideButton).click();
        }, delay);
    }

    getCurrentAndTargetSlide(direction) {

        this.currentSlide = this.slidesTrack.querySelector('.carousel__slide_current');
        this.currentIndicator = this.indicatorsList.querySelector('.carousel__indicator_current');
    
        if (direction == 'forward') {

            this.targetSlide = this.currentSlide.nextElementSibling;
            this.targetIndicator = this.currentIndicator.nextElementSibling;

            if (!this.targetSlide) {
                
                this.targetSlide = this.slides[0];
                this.targetIndicator = this.indicators[0];

                return true;
            }
        }
        
        else if (direction == 'backward') {

            this.targetSlide = this.currentSlide.previousElementSibling;
            this.targetIndicator = this.currentIndicator.previousElementSibling;

            if (!this.targetSlide) {
            
                this.targetSlide = this.slides[this.slidesAmount - 1];
                this.targetIndicator = this.indicators[this.slidesAmount - 1];

                return true;
            }
        }

        else {

            this.targetSlide = this.slides[direction];
            this.targetIndicator = this.indicators[direction];
        }

        return false;
    }

    slide(direction) {

        this.targetIsOutOfBounds = this.getCurrentAndTargetSlide(direction);
        this.moveToSlide(this.targetIsOutOfBounds);
    }

    addEventListeners() {

        $(window).resize(() => {

            this.slideWidth = this.slides[0].getBoundingClientRect().width;
            this.positionSlides(this.targetSlideIndex, this.slideWidth);
        });
    
        $(this.nextSlideButton).click(() => {
            
            if (this.onGoingAnimation)
                return;
            
            this.slide('forward');
        });
    
        $(this.prevSlideButton).click(() => {
            
            if (this.onGoingAnimation)
                return;
            
            this.slide('backward');
        });
    
        $(this.indicators).click((clickedIndicator) => {

            if (this.onGoingAnimation)
                return;

            this.slide(this.indicators.findIndex(indicator => indicator == clickedIndicator.target));
        });
    }
};

export default Carousel;
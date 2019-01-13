
class AutoSlide {

    constructor(container) {

        this.container = container;
        this.containerWidth = container.getBoundingClientRect().width;
   
        this.items = Array.from(container.children);
        this.itemWidth = this.items[0].getBoundingClientRect().width;
        this.gridGap = parseInt(window.getComputedStyle(this.container).gridColumnGap);
    }

    animate(duration) {

        const shift = this.itemWidth + this.gridGap;

        $(this.container).animate({
            left: '-=' + shift
        },
        {
            duration: duration,
            easing: 'swing',
            complete: () => {
                
                var item = this.items.splice(0, 1);
                
                item[0].remove();
                this.container.appendChild(item[0]);
                this.container.style.left = parseInt(this.container.style.left) + shift + 'px';
                this.items.push(item[0]);

                this.animate(duration);
            }
        });
    }
}

export default AutoSlide;
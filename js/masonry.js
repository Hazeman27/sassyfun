
class Masonry {

    constructor(grid) {

        this.grid = grid;
        this.items = Array.from(grid.children);
        this.columnCount = parseInt(window.getComputedStyle(this.grid).columnCount);
    }

    orderItemsLeftToRight() {

        this.items.forEach(item => { item.remove(); });

        for (let i = 0; i < this.columnCount; i++) {
            
            this.grid.appendChild(this.items[i]);

            for (let j = 0; this.items[(this.columnCount * (j + 1)) + i] != undefined; j++)
                this.grid.appendChild(this.items[(this.columnCount * (j + 1)) + i]);
        }
    }

    fillWithRandomImages(imageContainer) {

        const images = Array.from(imageContainer);
        
        images.forEach((image, index) => {
            $(image).attr('src', 'https://source.unsplash.com/random/60' + index);
        });
    }
}

$(document).ready(() => {

    // ** ORDERING GRID ITEMS **

    const grid = $('.masonry-grid')[0];
    const imageContainer = $('.masonry-grid__item__background');

    const masonry = new Masonry(grid);

    masonry.fillWithRandomImages(imageContainer);
    masonry.orderItemsLeftToRight();

    $(window).resize(() => {
        masonry.columnCount = parseInt(window.getComputedStyle(grid).columnCount);
        masonry.orderItems();
    });



    // ** RATING **



    const ratingButton = $('.masonry-grid__item__rating');
    
    var rated = false;
 
    $(ratingButton).click(function() {
 
        const path = $($(this)).css('background-image');
        const rating = $(this);
        const currentRating = parseInt($(rating).text());
 
        if (rated) {
             
            $(rating).css('background-image', path.replace('heart-pressed.png', 'heart.png'));
            $(rating).text(currentRating - 1);
             
            rated = false;
        }
        else {
             
            $(rating).css('background-image', path.replace('heart.png', 'heart-pressed.png'));
            $(rating).text(currentRating + 1);
 
            rated = true;
        }
    }); 
});
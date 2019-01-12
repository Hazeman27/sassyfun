
$(document).ready(() => {

    // ** Filling with random images **
    
    const images = Array.from($('.masonry-grid__item__background'));
    images.forEach((image, index) => {
        
        $(image).attr('src', 'https://source.unsplash.com/random/60' + index);
    });

    // ===============================
    // New Line
    /*const resizeGridItem = (item) => {

        const grid = $('.masonry-grid')[0];
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        const imageHeight = item.querySelector('.masonry-grid__item__background').getBoundingClientRect().height;
        const rowSpan = Math.ceil((imageHeight + rowGap) / (rowHeight + rowGap));

        item.style.gridRowEnd = "span " + rowSpan;
    }

    const resizeAllGridItems = () => {
        
        const allItems = document.getElementsByClassName('masonry-grid__item');
        
        for(let i = 0; i < allItems.length; i++)
            resizeGridItem(allItems[i]);
    }

    const resizeInstance = (instance) => {
        
        const item = instance.elements[0];
        resizeGridItem(item);
    }

    window.onload = resizeAllGridItems();
    window.addEventListener('resize', resizeAllGridItems);

    const allItems = document.getElementsByClassName('masonry-grid__item');
    
    for(i = 0; i < allItems.length; i++)
        if (allItems[i].getElementsByTagName('img').length > 0)
            imagesLoaded(allItems[i], resizeInstance);
*/

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
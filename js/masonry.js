
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

    addEventListenerForWindowResize() {

        $(window).resize((event) => {
            
            this.columnCount = parseInt(window.getComputedStyle(this.grid).columnCount);
            this.orderItemsLeftToRight();
        });
    }
}

export default Masonry;
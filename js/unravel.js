
class Unravel {

    constructor(container, navigationBar) {

        this.container = container;
        this.navigationBar = navigationBar;
        this.items = Array.from(container.children);
       
        this.itemsTitles = new Array;
        this.itemsParagraphs = new Array;
        this.itemsRatings = new Array;
        this.itemsLinks = new Array;
        this.itemsBackgrounds = new Array;

        this.itemElementsClassNameSufixes = ['__title', '__paragraph', '__link', '__rating', '__background'];

        this.unraveled = false;
        this.unraveledItem = null;
        this.unraveledItemElements = null;

        this.ratedItemsList = Array(this.items.length);
    }

    createUnravelClasses() {

        this.container.classList.add('unravel');

        this.items.forEach((item, index) => {

            item.classList.add('unravel__item');
            
            this.itemsTitles.push(item.querySelector('h2'));
            this.itemsTitles[index].classList.add('unravel__item__title');

            this.itemsParagraphs.push(item.querySelector('p'));
            this.itemsParagraphs[index].classList.add('unravel__item__paragraph');

            this.itemsRatings.push(item.querySelector('span'));
            this.itemsRatings[index].classList.add('unravel__item__rating');

            this.itemsLinks.push(item.querySelector('a'));
            this.itemsLinks[index].classList.add('unravel__item__link');

            this.itemsBackgrounds.push(item.querySelector('img'));
            this.itemsBackgrounds[index].classList.add('unravel__item__background');
        });
    }

    addEventListeners() {

        $(this.items).hover((hoveredItem) => {
           
            $(hoveredItem.target).click( (item) => {
                $(item.target).parent().children('.unravel__item__background').css('filter', 'brightness(100%)');
            });

            if (this.unraveled)
                return;

            else
                $(hoveredItem.target).parent().children('.unravel__item__background').css('filter', 'brightness(65%)');

        },(hoveredItem) => {

            $(hoveredItem.target).parent().children('.unravel__item__background').css('filter', 'brightness(100%)');
        });
    
        $(this.items).click((unraveledItem) => {

            if (unraveledItem.target.className.includes('__rating'))
                    return;

            if (this.unraveled) {

                unraveledItem = $('.unravel__item_unraveled')[0];
                
                unraveledItem.classList.remove('unravel__item_unraveled');
                
                this.unraveledItemElements.forEach((element, index) => {
                    element.classList.remove('unravel__item_unraveled' + this.itemElementsClassNameSufixes[index]);
                });

                $('nav').css('display', 'grid');

                this.unraveled = false;
            }
            
            else {

                unraveledItem = unraveledItem.target.parentElement;

                unraveledItem.classList.add(unraveledItem.className + '_unraveled');
                this.unraveledItemElements = Array.from(unraveledItem.children);
    
                this.unraveledItemElements.forEach((element, index) => {
                    element.classList.add(unraveledItem.classList[unraveledItem.classList.length - 1] + this.itemElementsClassNameSufixes[index]);
                });

                $('nav').css('display', 'none');

                this.unraveled = true;
            }
        });
    }

    addRating() {

        $(this.itemsRatings).click((clickedItem) => {
    
            var path = $(clickedItem.target).css('background-image');
            
            var ratedItem = $(clickedItem.target)[0];
            var currentRating = parseInt($(ratedItem).text());
            
            var ratedItemIndex = this.items.findIndex(item => item == ratedItem.parentElement);
            var isRated = this.ratedItemsList[ratedItemIndex];
            

            if (isRated) {
                
                $(ratedItem).css('background-image', path.replace('heart-pressed.png', 'heart.png'));
                $(ratedItem).text(currentRating - 1);
                
                this.ratedItemsList[ratedItemIndex] = false;
            }
            else {
                
                $(ratedItem).css('background-image', path.replace('heart.png', 'heart-pressed.png'));
                $(ratedItem).text(currentRating + 1);
    
                this.ratedItemsList[ratedItemIndex] = true;
            }
        });
    }
}

export default Unravel;
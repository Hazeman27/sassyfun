
$(document).ready(() => {

    const containerClassName = 'masonry-grid__item';
    const items = document.getElementsByClassName(containerClassName);

    var unraveled = false;
    var unraveledItem = null;
    var unraveledItemChildren, unraveledItemChildrenSufixes;

    $(items).hover(function() {

        this.addEventListener('click', e => {
            $(this.children[4]).css('filter', 'brightness(100%)');
        });
        if (unraveled) return;
        else $(this.children[4]).css('filter', 'brightness(65%)');
    }, function() {
        $(this.children[4]).css('filter', 'brightness(100%)');
    });

    $(items).click(function() {

        if (unraveled) {

            unraveledItem.classList.remove(unraveledItem.classList[1]);
            unraveledItemChildren.forEach(child => { child.classList.remove(child.classList[1]); });
            unraveled = false;
        }
        
        else {

            this.classList.add(this.className + '_unraveled');
            
            unraveledItem = this;
            unraveled = true;

            unraveledItemChildren = Array.from(unraveledItem.children);
            unraveledItemChildrenSufixes = new Array;

            unraveledItemChildren.forEach(child => {
                unraveledItemChildrenSufixes.push(child.className.replace(containerClassName, ''));
            });

            unraveledItemChildren.forEach((child, index) => {
                child.classList.add(unraveledItem.classList[1] + unraveledItemChildrenSufixes[index]);
            });
        }
    });
});
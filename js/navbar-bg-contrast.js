
class NavBarContrast {

    constructor(colorSwitchPointElement, navigationBar, navigationBarLinks, navigationBarButton) {

        this.navigationBar = navigationBar;
        this.navigationBarLinks = navigationBarLinks;
        this.navigationBarButton = navigationBarButton;
        this.colorSwitchPoint = colorSwitchPointElement.getBoundingClientRect().height;

        this.scrollPosition = 0;
    }

    addWindowScrollListener() {

        $(window).scroll(() => {
        
            this.scrollPosition = $(window).scrollTop();
    
            if (this.scrollPosition > this.colorSwitchPoint) {
                this.switchStyle('black');
            }
            else {
                this.switchStyle('white');
            }
        });
    }

    switchStyle(newColor) {

        $(this.navigationBar).css('color', newColor);
        $(this.navigationBarButton).css('fill', newColor);

        if (newColor == 'black')
            $(this.navigationBar).css({'background-color': 'white'});
        else
            $(this.navigationBar).css({'background-color': 'transparent'});
        
        for (let i = 0; i < this.navigationBarLinks.length; i++) {
                
            if (newColor == 'black')
                this.navigationBarLinks[i].classList.add('dark');
            else
                this.navigationBarLinks[i].classList.remove('dark');
        }
    }
};

export default NavBarContrast;
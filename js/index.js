(() => {
    const openButton = document.getElementsByClassName('header--hamburger')[0];
    const closeButton = document.getElementsByClassName('side-menu--close')[0];

    const headerButtonsContainer = document.getElementsByClassName('header--button-wrapper')[0];
    const sideMenuContainer = document.getElementsByClassName('side-menu')[0];

    openButton.addEventListener('click', () => {
        sideMenuContainer.style.display = 'block';
        headerButtonsContainer.style.display = 'none';
    })

    closeButton.addEventListener('click', () => {
        sideMenuContainer.style.display = 'none';
        headerButtonsContainer.style.display = 'flex';
    })

})();
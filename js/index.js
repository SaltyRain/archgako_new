//hamburger opening
const openButton = document.getElementsByClassName("header--hamburger")[0];
const closeButton = document.getElementsByClassName("side-menu--close")[0];

const headerButtonsContainer = document.getElementsByClassName(
    "header--button-wrapper"
)[0];
const sideMenuContainer = document.getElementsByClassName("side-menu")[0];

openButton.addEventListener("click", () => {
    sideMenuContainer.style.display = "flex";
    headerButtonsContainer.style.display = "none";
});

closeButton.addEventListener("click", () => {
    sideMenuContainer.style.display = "none";
    headerButtonsContainer.style.display = "flex";
});

// Плавный переход к якорю
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute("href").substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}

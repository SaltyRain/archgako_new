(() => {
    const openButton = document.getElementsByClassName("header--hamburger")[0];
    const closeButton = document.getElementsByClassName("side-menu--close")[0];

    const headerButtonsContainer = document.getElementsByClassName(
        "header--button-wrapper"
    )[0];
    const sideMenuContainer = document.getElementsByClassName("side-menu")[0];

    openButton.addEventListener("click", () => {
        sideMenuContainer.style.display = "block";
        headerButtonsContainer.style.display = "none";
    });

    closeButton.addEventListener("click", () => {
        sideMenuContainer.style.display = "none";
        headerButtonsContainer.style.display = "flex";
    });
})();

function Slides() {
    let slidesWidth = document.querySelector(".slider--wrapper").offsetWidth;
    const get = () => slidesWidth;
    const set = (value) => (slidesWidth = value);
    return {
        get,
        set,
    };
}

const slide = new Slides();
const mediaQueriesLists = [
    window.matchMedia("(min-width: 480px)"),
    window.matchMedia("(min-width: 768px)"),
    window.matchMedia("(min-width: 1000px)"),
];

const mediaReg = (media) => media.match(/\d+/)[0];

console.log(mediaQueriesLists, "list");

const onQueryChange = (evt) => {
    const media = mediaReg(evt.media);
    switch (media) {
        case "1000":
            break;
        case "768":
            break;
        case "480":
            break;
    }
    console.log(slide.get(), "width");
};

mediaQueriesLists.forEach((query) =>
    query.addEventListener("change", onQueryChange)
);

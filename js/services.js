const removeActive = (buttons, type) =>
    buttons.forEach((btn) => btn.classList.remove(`${type}-active`));

const hideBlocks = (type) => {
    if (type === "main") {
        const blocks = [
            document.querySelector("#design"),
            document.querySelector("#consultation"),
            document.querySelector("#express"),
        ];
        blocks.forEach((block) => (block.style.display = "none"));
    }

    if (type == "extra") {
        const blocks = [
            document.querySelector("#designer"),
            document.querySelector("#author"),
            document.querySelector("#equip"),
        ];
        blocks.forEach((block) => (block.style.display = "none"));
    }
};

function popUpInfo() {
    const state = {
        main: [],
        extra: [],
    };

    const checkExtra = (incomingType) =>
        state.extra.some((extraType) => extraType.type === incomingType);

    const addMain = (type) => {
        if (state.main.includes(type)) return;
        state.main.push(type);
    };

    const addExtra = (type, plan) => {
        if (checkExtra(type)) return;
        state.extra.push({ type, plan });
    };

    const getMain = () => state.main;

    const getExtra = () => state.extra;

    return {
        getMain,
        getExtra,
        addMain,
        addExtra,
    };
}

const popUp = new popUpInfo();

const buttonsListener = (buttons, type) => {
    buttons.forEach((button) => {
        button.addEventListener("click", (evt) => {
            evt.preventDefault();

            const blockId = button.id.match(/(?<=btn-)[a-z]*/)[0];
            const block = document.querySelector(`#${blockId}`);

            if (button.classList.contains(`${type}-active`)) {
                button.classList.remove(`${type}-active`);
                block.style.display = "none";
                return;
            }

            removeActive(buttons, type);
            hideBlocks(type);
            button.classList.add(`${type}-active`);

            const mainIds = ["design", "consultation", "express"];
            const extraIds = ["designer", "author", "equip"];

            if (mainIds.includes(blockId)) block.style.display = "flex";
            if (extraIds.includes(blockId)) block.style.display = "block";
            popUp.addMain(type);
        });
    });
};

const mainButtons = [
    ...document.getElementsByClassName("services-block--item_main"),
];
const extraButtons = [
    ...document.getElementsByClassName("services-block--item_extra"),
];

buttonsListener(mainButtons, "main");
buttonsListener(extraButtons, "extra");

const plansInputs = [
    ...document.getElementsByClassName("plan-grid--plan-input"),
];

plansInputs.forEach((input) => {
    input.addEventListener("click", (evt) =>
        console.log(evt.currentTarget.dataset.plan)
    );
});

console.log(popUp.getMain());

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

const getStateName = (type) => {
    switch (type) {
        case "design":
            return "Дизайн проект";
        case "consultation":
            return "Консультация";
        case "express":
            return "Экспресс дизайн";
        case "designer":
            return "Выезд дизайнера";
        case "author":
            return "Авторский надзор";
        case "equip":
            return "Комплектация";
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
        if (checkExtra(type) === true) return;
        state.extra.push({ type, plan });
    };

    const getMain = () => state.main;

    const getExtra = () => state.extra;

    const destructor = () => {
        state.main = [];
        state.extra = [];
    };

    const removeMain = (type) => {
        const typeIndex = state.main.indexOf(type);
        state.main.splice(typeIndex, 1);
    };

    const removeExtra = (type) => {
        const typeIndex = state.extra.findIndex(
            (extraObj) => extraObj.type === type
        );
        state.extra.splice(typeIndex, 1);
    };

    return {
        getMain,
        getExtra,
        addMain,
        addExtra,
        removeMain,
        removeExtra,
        destructor,
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

            const serviceType = evt.currentTarget.id.match(
                /(?<=btn-)[a-z]*/
            )[0];

            if (type === "main") popUp.addMain(serviceType);
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
    input.addEventListener("click", (evt) => {
        const type = evt.currentTarget.dataset.plan.split("-")[0];
        const plan = evt.currentTarget.dataset.plan.split("-")[1];
        popUp.addExtra(type, plan);
    });
});

const addServiceButtons = [
    ...document.getElementsByClassName("service-info--button"),
];

const createInput = (typeArray) => {
    const popUpElement = document.querySelector(".b-popup--choosed-services");
    typeArray.forEach((typeObj) => {
        const inputElement = document.createElement("li");
        inputElement.classList.add("b-popup--label");
        const button = document.createElement("button");
        button.classList.add("b-popup--label-button");
        if (typeof typeObj !== "string") {
            let flag = true;
            for (let i = 0; i < popUpElement.childNodes.length; i++) {
                const child = popUpElement.childNodes[i];
                if (
                    [...child.textContent.split("–")[0]]
                        .splice(-1, 1)
                        .join("") === `${getStateName(typeObj.type)}`
                )
                    flag = false;
                if (
                    child.textContent ===
                    `${getStateName(
                        typeObj.type
                    )} – ${typeObj.plan.toUpperCase()}`
                )
                    flag = false;
            }
            if (flag) {
                inputElement.textContent = `${getStateName(
                    typeObj.type
                )} – ${typeObj.plan.toUpperCase()}`;
                button.id = `${typeObj.type}`;
                button.addEventListener("click", () => {
                    popUp.removeExtra(button.id);
                    const parentButton = button.parentElement;
                    const parentListElement = parentButton.parentElement;
                    parentListElement.removeChild(parentButton);
                });
                inputElement.appendChild(button);
                popUpElement.appendChild(inputElement);
            }
        } else {
            let flag = true;
            for (let i = 0; i < popUpElement.childNodes.length; i++) {
                const child = popUpElement.childNodes[i];
                if (child.textContent === `${getStateName(typeObj)}`)
                    flag = false;
            }
            if (flag) {
                inputElement.textContent = `${getStateName(typeObj)}`;
                button.id = `${typeObj}`;
                button.addEventListener("click", () => {
                    popUp.removeMain(typeObj);
                    const parentButton = button.parentElement;
                    const parentListElement = parentButton.parentElement;
                    parentListElement.removeChild(parentButton);
                });
                inputElement.appendChild(button);
                popUpElement.appendChild(inputElement);
            }
        }
    });
};

addServiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const main = popUp.getMain();
        const extra = popUp.getExtra();
        createInput(main);
        createInput(extra);
    });
});

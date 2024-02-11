class RollDice {
  #makeEle(ele, className) {
    const element = document.createElement(ele);
    if (className) element.className = className;
    return element;
  }

  makeDiceOne() {
    const divEle = this.#makeEle("div", "roll roll_1 flex_center");
    const spanEle = this.#makeEle("span", "roll_point");
    divEle.appendChild(spanEle);
    return divEle;
  }

  makeDiceTwo() {
    const divEle = this.#makeEle("div", "roll roll_2");
    const newDiv = this.#makeEle("div", "line1");
    const span1 = this.#makeEle("span", "roll_point");
    newDiv.appendChild(span1);
    divEle.appendChild(newDiv);
    const span2 = this.#makeEle("span", "roll_point");
    divEle.appendChild(span2);
    return divEle;
  }

  makeDiceThree() {
    const divEle = this.makeDiceTwo();
    const node = divEle.children[1];
    divEle.removeChild(node);
    const newDiv = this.#makeEle("div", "line2 flex_center");
    const span = this.#makeEle("span", "roll_point");
    newDiv.appendChild(span);
    divEle.appendChild(newDiv);
    divEle.appendChild(node);
    return divEle;
  }

  makeDiceFour() {
    const fourDiceEle = this.#makeEle("div", "roll roll_2 roll_4");
    for (let i = 1; i <= 2; i++) {
      const divEle = this.#makeEle("div", "line");
      const span1 = this.#makeEle("span", "roll_point");
      const span2 = this.#makeEle("span", "roll_point");
      divEle.appendChild(span1);
      divEle.appendChild(span2);
      fourDiceEle.appendChild(divEle);
    }
    return fourDiceEle;
  }

  makeDiceFive() {
    const fiveDice = this.makeDiceFour();
    const lastChild = fiveDice.lastChild;
    fiveDice.removeChild(lastChild);
    const newEle = this.#makeEle("div", "flex_center");
    const spanEle = this.#makeEle("span", "roll_point");
    newEle.appendChild(spanEle);
    fiveDice.appendChild(newEle);
    fiveDice.appendChild(lastChild);
    return fiveDice;
  }

  makeDiceSix() {
    const sixeDiceEle = this.#makeEle("div", "roll roll_2 roll_4");
    for (let i = 1; i <= 3; i++) {
      const newEle = this.#makeEle("div", "line");
      newEle.innerHTML = `<span class="roll_point"></span>
      <span class="roll_point"></span>
      <span class="roll_point"></span>`;
      sixeDiceEle.appendChild(newEle);
    }

    return sixeDiceEle;
  }
}
const rollContainer = document.querySelector(".roll_container");
const dice_form = document.querySelector(".dice_form");
const rollDice = new RollDice();

function createDice(randomNumber) {
  switch (randomNumber) {
    case 1:
      rollContainer.appendChild(rollDice.makeDiceOne());
      break;
    case 2:
      rollContainer.appendChild(rollDice.makeDiceTwo());
      break;
    case 3:
      rollContainer.appendChild(rollDice.makeDiceThree());
      break;
    case 4:
      rollContainer.appendChild(rollDice.makeDiceFour());
      break;
    case 5:
      rollContainer.appendChild(rollDice.makeDiceFive());
      break;
    case 6:
      rollContainer.appendChild(rollDice.makeDiceSix());
  }
}

function formHandler(event) {
  event.preventDefault();
    const formData = new FormData(dice_form);
    const value = formData.get("diceNumber");
    rollContainer.innerHTML = "";

    for (let i = 1; i <= value; i++) {
      const randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      createDice(randomNumber);
    }
}

dice_form.addEventListener("submit", formHandler);

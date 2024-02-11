const inputs = document.querySelectorAll("input");



const handleInput = (e) => {
  e.preventDefault();
  let keyVal = e.key;
  const node = e.currentTarget;
  const value = node.value + "";
  const index = Number(node.dataset["index"]);

  if (value.length > 1) {
    keyVal = "removeChar";
  } else if (keyVal == "Backspace") {
    keyVal = "Delete";
  } else if (e.code == "Space") {
    keyVal = "Space";
  } else if (keyVal >= 0 && keyVal <= 9) {
    keyVal = "focusNext";
  }

  switch (keyVal) {
    case "Delete":
      {
        node.value = "";
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
      break;

    case "Space":
      {
        alert("space");
        node.value = "";
      }
      break;

    case "removeChar":
      {
        node.value = isNaN(value.charAt(0)) ? "" : Number(value.charAt(0));
      }
      break;

    case "focusNext":
      {
        if (index < inputs.length - 1) {
          if (value.length != 0)
              inputs[index + 1].focus();
        }
      }
      break;

    default: {
      e.currentTarget.value = "";
    }
  }
};

for (let input of inputs) {
    input.addEventListener("keyup",handleInput);
  }

  inputs[0].focus();
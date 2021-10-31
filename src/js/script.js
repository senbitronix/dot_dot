/* custom select */

function createCustomSelect() {
  let selects = document.querySelectorAll(".select");
  console.log(selects);
  for (let select of selects) {
    let selectFinal = select.querySelector(".select__final");
    let selectWrapper = select.querySelector(".select__wrapper");
    let selectBox = select.querySelector(".select__box");

    selectBox.children[selectBox.children.length - 1].addEventListener(
      "focusout",
      (e) => {
        selectBox.children[0].focus();
      }
    );

    select.addEventListener("focusin", (e) => {
      if (e.target.classList.contains("select__final")) {
        selectBox.classList.add("opened");
        selectWrapper.classList.add("opened");
      }
      if (e.target.classList.contains("select__option")) {
        selectFinal.value = e.target.textContent;
        selectFinal.dataset.readonly = false;
      }
    });

    select.addEventListener("click", (e) => {
      if (e.target.classList.contains("select__final")) {
        selectBox.classList.remove("opened");
        selectBox.classList.add("opened");
        selectWrapper.classList.add("opened");
      } else {
        selectBox.classList.remove("opened");
        selectWrapper.classList.remove("opened");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (selectBox.classList.contains("opened")) {
        if (e.code == "Escape" || e.code == "Enter") {
          selectBox.classList.remove("opened");
          selectWrapper.classList.remove("opened");
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("select__final")) {
        selectBox.classList.remove("opened");
        selectWrapper.classList.remove("opened");
      }
    });
  }
}

function addTitles() {
  let selectLis = document.querySelectorAll(".select__option");
  for (let li of selectLis) {
    li.title = li.textContent;
  }
}

createCustomSelect();
addTitles();

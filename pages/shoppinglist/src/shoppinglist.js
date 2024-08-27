document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItems();
  });
});

const itemNameElement = document.getElementById("item-name");
const itemAmountElement = document.getElementById("item-amount");
const tableElement = document.querySelector("table");
function addItems() {
  createTableHead("Nome", "Quantidade", "Opções de Edição");
  createTableBody(itemNameElement.value, itemAmountElement.value);
  createTableFooter("Quantidade Total");
}

function createTableHead(col1, col2, col3) {
  if (tableElement.contains(document.querySelector("thead"))) {
    return;
  }
  const theadElement = document.createElement("thead");
  const trElement = document.createElement("tr");
  const thNameElement = document.createElement("th");
  const thAmountElement = document.createElement("th");
  const thEditOptions = document.createElement("th");

  tableElement.appendChild(theadElement);
  theadElement.appendChild(trElement);
  trElement.appendChild(thNameElement);
  trElement.appendChild(thAmountElement);
  trElement.appendChild(thEditOptions);

  thNameElement.setAttribute("scope", "col");
  thAmountElement.setAttribute("scope", "col");
  thEditOptions.setAttribute("scope", "col");
  thNameElement.innerText = col1;
  thAmountElement.innerText = col2;
  thEditOptions.innerText = col3;
}

function createTableBody(itemName, itemAmount) {
  let alternateMethod = () => {
    return document.createElement("tbody");
  };
  try {
    if (itemName === "") {
      throw new Error("Nenhum item adicionado");
    }

    if (itemAmount === "" || itemAmount <= 0) {
      throw new Error("Quantidade deve ser maior do que 0");
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return;
  }

  if (tableElement.contains(document.querySelector("tbody"))) {
    const tbodyElement = document.querySelector("tbody");
    for (let trNames of tbodyElement.children) {
      try {
        if (trNames.children[0].innerText === itemName) {
          throw new Error("Item já adicionado");
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
        return;
      }
    }
    alternateMethod = () => {
      return document.querySelector("tbody");
    };
  }

  const tbodyElement = alternateMethod();
  const trElement = document.createElement("tr");
  const tdNemeElement = document.createElement("td");
  const tdAmountElement = document.createElement("td");
  const tdEditOptions = document.createElement("td");

  tableElement.appendChild(tbodyElement);
  tbodyElement.appendChild(trElement);
  trElement.appendChild(tdNemeElement);
  trElement.appendChild(tdAmountElement);
  trElement.appendChild(tdEditOptions);

  tdNemeElement.setAttribute("class", "col-name");
  tdAmountElement.setAttribute("class", "col-amount");
  tdNemeElement.innerText = itemName;
  tdAmountElement.innerText = itemAmount;

  const spanDeleteElement = document.createElement("span");
  const spanEditElement = document.createElement("span");

  const classGIcons = "material-symbols-outlined";

  spanDeleteElement.classList.add(classGIcons);
  spanEditElement.classList.add(classGIcons);
  spanDeleteElement.classList.add("delete");
  spanEditElement.classList.add("edit");

  spanDeleteElement.innerText = "delete";
  spanEditElement.innerText = "edit";

  tdEditOptions.appendChild(spanDeleteElement);
  tdEditOptions.appendChild(spanEditElement);

  spanDeleteElement.onclick = function (event) {
    const deleteElementGrandParent = event.target.parentElement.parentElement;

    deleteElementGrandParent.remove();
  };

  spanEditElement.onclick = function (event) {
    if(spanEditElement.style.color === "red"){
      spanEditElement.style.color = "black";
      return;
    }
    const editElementGrandParent = event.target.parentElement.parentElement;
    spanEditElement.style.color = "red";
    editList(editElementGrandParent);
  };

  if (tableElement.contains(document.querySelector("tfoot"))) {
    calculateTotalAmount();
  }
}

function editList(row) {
  const itemName = row.children[0];
  const itemAmount = row.children[1];

  itemName.onclick = function (event) {
    


    const editIcon = row.children[2].children[1];
    if(editIcon.style.color === "red"){

      const target = itemName;
  
      const originalText = target.innerText;
  
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.value = originalText;
  
      target.innerHTML = "";
      target.appendChild(inputElement);
  
      inputElement.focus();
  
      inputElement.addEventListener("blur", function () {
        saveEdit();
      });
  
      inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          saveEdit();
        }
      });
  
  
      function saveEdit() {
        const newValue = inputElement.value;
        target.innerHTML = newValue;
  
        editIcon.style.color = "black";
      }
    }

  };
}

function createTableFooter(col1) {
  if (tableElement.contains(document.querySelector("tfoot"))) {
    return;
  }

  const tfooterElement = document.createElement("tfoot");
  const trElement = document.createElement("tr");
  const thElement = document.createElement("th");
  const tdElement = document.createElement("td");
  const tdElementEmpty = document.createElement("td");

  tableElement.appendChild(tfooterElement);
  tfooterElement.appendChild(trElement);
  trElement.appendChild(thElement);
  trElement.appendChild(tdElement);
  trElement.appendChild(tdElementEmpty);

  let totalValue = 0;

  for (let trAmounts of tableElement.children[2].children) {
    totalValue += Number(trAmounts.children[1].textContent);
  }

  thElement.setAttribute("scope", "row");
  tdElement.setAttribute("id", "total-amount");
  thElement.innerText = col1;
  tdElement.innerText = totalValue;
  tdElementEmpty.innerText = "";
}

function calculateTotalAmount() {
  const tbodyElement = document.querySelector("tbody");
  const tfootElement = document.querySelector("tfoot");
  const totalAmountElement = document.getElementById("total-amount");
  let totalValue = Number(totalAmountElement.textContent);
  for (let trAmounts of tbodyElement.lastElementChild.children) {
    if (!isNaN(trAmounts.textContent)) {
      totalValue += Number(trAmounts.textContent);
    }
  }
  totalAmountElement.textContent = totalValue;
}

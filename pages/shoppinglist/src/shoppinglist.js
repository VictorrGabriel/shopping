document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItems();
  });
});

const itemNameElement = document.getElementById("item-name");
const itemAmountElement = document.getElementById("item-amount");
function addItems() {
  createTableHead("Nome", "Quantidade");
  createTableBody(itemNameElement.value, itemAmountElement.value);
  createTableFooter("Quantidade Total");

}

function createTableHead(col1, col2) {
  const tableElement = document.querySelector("table");

  if (tableElement.contains(document.querySelector("thead"))) {
    return;
  }
  const theadElement = document.createElement("thead");
  const trElement = document.createElement("tr");
  const thNameElement = document.createElement("th");
  const thAmountElement = document.createElement("th");

  tableElement.appendChild(theadElement);
  theadElement.appendChild(trElement);
  trElement.appendChild(thNameElement);
  trElement.appendChild(thAmountElement);

  thNameElement.setAttribute("scope", "col");
  thAmountElement.setAttribute("scope", "col");
  thNameElement.innerText = col1;
  thAmountElement.innerText = col2;
}

function createTableBody(itemName, itemAmount) {
  const tableElement = document.querySelector("table");

  let alternateMethod = () => {
    return document.createElement("tbody");
  };

  if (tableElement.contains(document.querySelector("tbody"))) {
    const tbodyElement = document.querySelector("tbody");
    for (let trNames of tbodyElement.children) {
      if (trNames.children[0].innerText === itemName) {
        alert("Item já adicionado");
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

  tableElement.appendChild(tbodyElement);
  tbodyElement.appendChild(trElement);
  trElement.appendChild(tdNemeElement);
  trElement.appendChild(tdAmountElement);

  tdNemeElement.setAttribute("class", "col-name");
  tdAmountElement.setAttribute("class", "col-amount");
  tdNemeElement.innerText = itemName;
  tdAmountElement.innerText = itemAmount;
}

function createTableFooter(col1){
    const tableElement = document.querySelector("table");

    if(tableElement.contains(document.querySelector("tfoot"))){
        const tfootElement = document.querySelector("tfoot");
        const totalAmountElement = document.getElementById("total-amount");
        let totalValue = Number(totalAmountElement.textContent)
        for(let trAmounts of tfootElement.children){
             totalValue += Number(trAmounts.children[1].textContent)
        }
        totalAmountElement.textContent = totalValue
        return;
    }

   const tfooterElement = document.createElement("tfoot");
   const trElement = document.createElement("tr");
   const thElement = document.createElement("th");
   const tdElement = document.createElement("td");

   tableElement.appendChild(tfooterElement);
   tfooterElement.appendChild(trElement);
   trElement.appendChild(thElement);
   trElement.appendChild(tdElement);

   let totalValue = 0;

   for(let trAmounts of tableElement.children[2].children){
        totalValue += Number(trAmounts.children[1].textContent)
   }

   thElement.setAttribute("scope", "row");
   tdElement.setAttribute("id", "total-amount");
   thElement.innerText = col1
   tdElement.innerText = totalValue
}

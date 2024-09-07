import {
  createTableHead,
  createTableBody,
  createTableFoot,
} from "./createTable.js";

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
  createTableHead("Nome", "Quantidade", "Opções de Edição", tableElement);
  createTableBody(itemNameElement.value, itemAmountElement.value, tableElement);
  createTableFoot("Quantidade Total", tableElement);
}







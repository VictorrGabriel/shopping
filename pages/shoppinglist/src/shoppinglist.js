import {
  createTableHead,
  createTableBody,
  createTableFoot,
} from './createTable.js';

import { catchItems, x, objectList, rebuildTable } from './loclastorage.js';

const itemNameElement = document.getElementById('item-name');
const itemAmountElement = document.getElementById('item-amount');
const tableElement = document.querySelector('table');

const saveButtonElement = document.getElementById('save-button');
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('shoppingList')) {
    if (localStorage.getItem('shoppingList').length > 0) {
      rebuildTable(
        createTableHead,
        createTableBody,
        createTableFoot,
        tableElement,
      );
    }
  }
  const form = document.getElementById('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addItems();
  });
});

function addItems() {
  createTableHead('Nome', 'Quantidade', 'Opções de Edição', tableElement);
  createTableBody(itemNameElement.value, itemAmountElement.value, tableElement);
  createTableFoot('Quantidade Total', tableElement);
}

saveButtonElement.addEventListener('click', () => {
  const tbodyElement = document.querySelector('tbody');
  if (tbodyElement) {
    for (const rows of tbodyElement.children) {
      x(catchItems(rows.children[0].innerText, rows.children[1].innerText));
    }
    console.log(objectList);

    return;
  }
  alert('Não há itens para ser adicionado!');
});

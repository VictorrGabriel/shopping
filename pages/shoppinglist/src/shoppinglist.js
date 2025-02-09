import { createTableHead } from './createTableHead.js';
import { createTableBody } from './createTableBody.js';
import { createTableFoot } from './createTableFoot.js';

import {
  catchItems,
  updateToLocalstorage,
  clearLocalstorage,
  objectList,
  rebuildTable,
} from './loclastorage.js';

const itemNameElement = document.getElementById('item-name');
const itemAmountElement = document.getElementById('item-amount');
const tableElement = document.querySelector('table');

const saveButtonElement = document.getElementById('save-button');
document.addEventListener('DOMContentLoaded', () => {
  if (
    localStorage.getItem('shoppingList') &&
    localStorage.getItem('shoppingList').length > 0
  ) {
    rebuildTable(
      createTableHead,
      createTableBody,
      createTableFoot,
      tableElement,
    );
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
    console.log(tbodyElement.children);
    try {
      if (
        tbodyElement.children.length === 0 ||
        tbodyElement.children === null
      ) {
        clearLocalstorage('shoppingList');
        throw new Error('Não há linhas na tabela');
      }
    } catch (error) {
      console.error(error.message);
    }
    for (const rows of tbodyElement.children) {
      updateToLocalstorage(
        catchItems(rows.children[0].innerText, rows.children[1].innerText),
      );
    }
    console.log(objectList);

    return;
  }
  alert('Não há itens para ser adicionado!');
});

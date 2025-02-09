export function createTableBody(itemName, itemAmount, tableElement) {
  let alternateMethod = document.createElement('tbody');

  try {
    if (itemName === '') {
      throw new Error('Nenhum item adicionado');
    }

    if (itemAmount === '' || itemAmount <= 0) {
      throw new Error('Quantidade deve ser maior do que 0');
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return;
  }

  if (tableElement.contains(document.querySelector('tbody'))) {
    const tbodyElement = document.querySelector('tbody');
    for (let trNames of tbodyElement.children) {
      try {
        if (trNames.children[0].innerText === itemName) {
          throw new Error('Item já adicionado');
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
        return;
      }
    }
    alternateMethod = document.querySelector('tbody');
  }

  const tbodyElement = alternateMethod; // alteriei o valor da variável ALTERNATEMETHOD de uma função anônima com o retorno do documet.method para apenas o document.method.
  const trElement = document.createElement('tr');
  const tdNameElement = document.createElement('td');
  const tdAmountElement = document.createElement('td');
  const tdEditOptions = document.createElement('td');

  tableElement.appendChild(tbodyElement);
  tbodyElement.appendChild(trElement);
  trElement.append(tdNameElement, tdAmountElement, tdEditOptions);
  /*  trElement.appendChild(tdNameElement);
  trElement.appendChild(tdAmountElement);
  trElement.appendChild(tdEditOptions); */

  tdNameElement.setAttribute('class', 'col-name');
  tdAmountElement.setAttribute('class', 'col-amount');
  tdNameElement.innerText = itemName;
  tdAmountElement.innerText = itemAmount;

  const spanDeleteElement = document.createElement('span');
  const spanEditElement = document.createElement('span');

  const classGIcons = 'material-symbols-outlined';

  spanDeleteElement.classList.add(classGIcons);
  spanEditElement.classList.add(classGIcons);
  spanDeleteElement.classList.add('delete');
  spanEditElement.classList.add('edit');

  spanDeleteElement.innerText = 'delete';
  spanEditElement.innerText = 'edit';

  tdEditOptions.appendChild(spanDeleteElement);
  tdEditOptions.appendChild(spanEditElement);

  spanDeleteElement.onclick = function (event) {
    const deleteElementGrandParent = event.target.parentElement.parentElement;
    if (confirm('Deseja excluir esta linha?')) {
      deleteElementGrandParent.remove();
    }
  };

  spanEditElement.onclick = function (event) {
    if (spanEditElement.style.color === 'red') {
      spanEditElement.style.color = 'black';
      return;
    }
    const editElementGrandParent = event.target.parentElement.parentElement;
    spanEditElement.style.color = 'red';
    editList(editElementGrandParent);
  };

  if (tableElement.contains(document.querySelector('tfoot'))) {
    calculateTotalAmount();
  }
}

/* Funções auxiliares */

function editList(row) {
  const itemName = row.children[0];
  const rowParent = row.parentElement.children;
  const itemAmount = row.children[1];

  itemName.onclick = function (event) {
    const editIcon = row.children[2].children[1];
    if (editIcon.style.color === 'red') {
      const target = itemName;

      const originalText = target.innerText;

      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.value = originalText;

      target.innerHTML = '';
      target.appendChild(inputElement);

      inputElement.focus();

      inputElement.addEventListener('blur', function () {
        saveEdit();
      });

      inputElement.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          saveEdit();
        }
      });

      function saveEdit() {
        for (let items of rowParent) {
          if (items.children[0].textContent === inputElement.value) {
            alert('Item já adicionado!');
            inputElement.value = originalText;
          }
        }
        const newValue = inputElement.value;
        target.innerHTML = newValue;

        editIcon.style.color = 'black';
      }
    }
  };

  itemAmount.onclick = function (event) {
    const editIcon = row.children[2].children[1];
    if (editIcon.style.color === 'red') {
      const target = itemAmount;

      const originalText = itemAmount.innerText;

      const inputElement = document.createElement('input');
      inputElement.type = 'number';
      inputElement.value = originalText;

      target.innerHTML = '';
      target.appendChild(inputElement);

      inputElement.focus();

      inputElement.addEventListener('blur', function () {
        saveEdit();
      });

      inputElement.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          saveEdit();
        }
      });

      function saveEdit() {
        for (let items of rowParent) {
          if (isNaN(inputElement.value) || inputElement.value <= 0) {
            alert('Adicione um valor numerico acima de 0!');
            inputElement.value = originalText;
          }
        }
        const newValue = inputElement.value;
        target.innerHTML = newValue;

        editIcon.style.color = 'black';

        calculateTotalAmount(true);
      }
    }
  };
}

function calculateTotalAmount() {
  const tbodyElement = document.querySelector('tbody');
  const AmountsElements = document.querySelectorAll('.col-amount');
  const totalAmountElement = document.getElementById('total-amount');

  let totalValue = 0;
  for (let trAmounts of AmountsElements) {
    totalValue += Number(trAmounts.innerText);
  }
  totalAmountElement.textContent = totalValue;
}

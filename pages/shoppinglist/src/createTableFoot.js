export function createTableFoot(col1, tableElement) {
  if (tableElement.contains(document.querySelector('tfoot'))) {
    return;
  }

  const tfooterElement = document.createElement('tfoot');
  const trElement = document.createElement('tr');
  const thElement = document.createElement('th');
  const tdElement = document.createElement('td');
  const tdElementEmpty = document.createElement('td');

  tableElement.appendChild(tfooterElement);
  tfooterElement.appendChild(trElement);
  trElement.append(thElement, tdElement, tdElementEmpty);
  /*   trElement.appendChild(thElement);
    trElement.appendChild(tdElement);
    trElement.appendChild(tdElementEmpty); */

  let totalValue = 0;

  for (let trAmounts of tableElement.children[2].children) {
    totalValue += Number(trAmounts.children[1].textContent);
  }

  thElement.setAttribute('scope', 'row');
  tdElement.setAttribute('id', 'total-amount');
  thElement.innerText = col1;
  tdElement.innerText = totalValue;
  tdElementEmpty.innerText = '';
}

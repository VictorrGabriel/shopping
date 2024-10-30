export const objectList = [];

export function catchItems(itemName, itemAmount) {
  const rowData = {
    name: itemName,
    amount: itemAmount,
  };

  return rowData;
}

export function x(list) {
  function y() {
    const result = objectList.filter((objects) => objects.name === list.name);
    if (result != 0) {
      return false;
    }

    return true;
  }

  if (y()) {
    objectList.push({ name: list.name, amount: list.amount });
    localStorage.setItem('shoppingList', JSON.stringify(objectList));
  }
}

export function rebuildTable(cb1, cb2, cb3, tableElement) {
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList'));

  cb1('Nome', 'Quantidade', 'Opções de Edição', tableElement);
  for (const object of shoppingList) {
    cb2(object.name, object.amount, tableElement);
  }
  cb3('Quantidade Total', tableElement);
}

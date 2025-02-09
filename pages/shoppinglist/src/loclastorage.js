export const objectList = [];

export function catchItems(itemName, itemAmount) {
  const rowData = {
    name: itemName,
    amount: itemAmount,
  };

  return rowData;
}

export function updateToLocalstorage(list) {
  function isInList() {
    const result = objectList.filter((objects) => objects.name === list.name);
    if (result != 0) {
      return false;
    }

    return true;
  }

  if (isInList()) {
    objectList.push({ name: list.name, amount: list.amount });
    localStorage.setItem('shoppingList', JSON.stringify(objectList));
  }

  const tbodyChildren = document.querySelector('tbody').children;
  if(!isInList() && objectList.length > tbodyChildren.length){

    for (let row in tbodyChildren){
      const result = objectList.filter((objects) => objects.name !== row[0].innerText);
      console.log(result);
    }

    let indexRemoveItem = objectList.indexOf(result); // remover o index da lista que está no localstorage

    objectList.slice(indexRemoveItem, 1);
    localStorage.setItem('shoppingList', JSON.stringify(objectList));
    
  }
}

export function clearLocalstorage(list){
  localStorage.removeItem(list)
}

export function rebuildTable(cb1, cb2, cb3, tableElement) {
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList'));

  cb1('Nome', 'Quantidade', 'Opções de Edição', tableElement);
  for (const object of shoppingList) {
    cb2(object.name, object.amount, tableElement);
  }
  cb3('Quantidade Total', tableElement);
}

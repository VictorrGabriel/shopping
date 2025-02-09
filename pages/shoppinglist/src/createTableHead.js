export function createTableHead(col1, col2, col3, tableElement) {
    if (tableElement.contains(document.querySelector('thead'))) {
      return;
    }
    const theadElement = document.createElement('thead');
    const trElement = document.createElement('tr');
    const thNameElement = document.createElement('th');
    const thAmountElement = document.createElement('th');
    const thEditOptions = document.createElement('th');
  
    tableElement.appendChild(theadElement);
    theadElement.appendChild(trElement);
    trElement.append(thNameElement, thAmountElement, thEditOptions);
    /*   trElement.appendChild(thNameElement);
    trElement.appendChild(thAmountElement);
    trElement.appendChild(thEditOptions); 
    
    ###Substituimos o appendChild pelo append, pois assim conseguimos adicionar todos os filhos em uma linha de código.
  
    Testando bugs.
    
    */
  
    thNameElement.setAttribute('scope', 'col');
    thAmountElement.setAttribute('scope', 'col');
    thEditOptions.setAttribute('scope', 'col');
    thNameElement.innerText = col1;
    thAmountElement.innerText = col2;
    thEditOptions.innerText = col3;
  }
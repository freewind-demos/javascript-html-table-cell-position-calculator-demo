function findNextAvailableColIndex(matrix, rowIndex, colIndex) {
  let availableCol = colIndex;
  while (matrix[rowIndex] && matrix[rowIndex][availableCol]) {
    availableCol += 1;
  }
  return availableCol;
}

function fillMatrix(matrix, fromRowIndex, fromColIndex, cell) {
  for (let colIndex = fromColIndex; colIndex < fromColIndex + cell.colSpan; colIndex += 1) {
    for (let rowIndex = fromRowIndex; rowIndex < fromRowIndex + cell.rowSpan; rowIndex += 1) {
      if (!matrix[rowIndex]) {
        matrix[rowIndex] = [];
      }
      matrix[rowIndex][colIndex] = true;
    }
  }
}

function getTableCell(table, givenRow, givenCol) {
  const matrix = [];
  for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
    const row = table.rows[rowIndex];
    for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
      const cell = row.cells[colIndex];

      let nextAvailableColIndex = findNextAvailableColIndex(matrix, rowIndex, colIndex);
      fillMatrix(matrix, rowIndex, nextAvailableColIndex, cell);

      if (nextAvailableColIndex <= givenCol && givenCol < nextAvailableColIndex + cell.colSpan && (
          rowIndex <= givenRow && givenRow < rowIndex + cell.rowSpan
      )) {
        return cell;
      }
    }
  }
  return null;
}

const td = getTableCell(document.querySelector('#main tbody'), 4, 3);

td.style = "background-color: red";

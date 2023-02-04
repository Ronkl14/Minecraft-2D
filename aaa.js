function changeValues(arr) {
  const flattenArr = arr.flat(); // Flatten the 2D array into a 1D array
  const nonZeroElements = flattenArr.filter((val) => val !== 0); // Get all non-zero elements

  // Get the number of elements to change to 0
  const numOfElementsToChange = Math.ceil(nonZeroElements.length / 2);

  // Pick random non-zero elements and change their value to 0
  for (let i = 0; i < numOfElementsToChange; i++) {
    const randomIndex = Math.floor(Math.random() * nonZeroElements.length);
    const randomValue = nonZeroElements[randomIndex];
    const indexInFlattenArr = flattenArr.indexOf(randomValue);
    flattenArr[indexInFlattenArr] = 0;
  }

  // Convert the 1D array back to 2D
  const result = [];
  while (flattenArr.length) {
    result.push(flattenArr.splice(0, arr[0].length));
  }

  return result;
}

const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const result = changeValues(arr);
console.log(result);

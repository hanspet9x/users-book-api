export const randomizeArray = (array: []) => {
  let length = array.length; let temp; let random;
  while (--length > 0) {
    random = Math.floor(Math.random() * length + 1);
    temp = array[random];
    array[random] = array[length];
    array[length] = temp;
  }
  return array;
};

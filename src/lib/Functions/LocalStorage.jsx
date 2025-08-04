// Poso F&B Reserved.

const getItemFromStorage = (itemName) => {
  return JSON.parse(localStorage.getItem(itemName));
};

const saveItemIntoStorage = (itemName, value) => {
  localStorage.setItem(itemName, JSON.stringify(value));
  return 200;
};

const createDB = ({ name, initialValue }) => {
  if (!getItemFromStorage(name)) {
    localStorage.setItem(name, JSON.stringify(initialValue));
  }
};

//

export default {
  createDB,
  getItemFromStorage,
  saveItemIntoStorage,
};

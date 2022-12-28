export const setNewValue = (
  valueSelect,
  valueOption,
  setText,
  valueAll,
  callback
) => {
  let optionSelected = [];
  valueSelect.forEach((value, index) => {
    if (value) optionSelected.push(valueOption[index].title);
  });

  if (optionSelected.includes(valueAll[0])) {
    setText(valueAll);
    callback(valueAll);
  } else {
    setText(optionSelected.join("; "));
    callback(optionSelected);
  }
};

export function getInitialValue(options, value, all) {
  let initialValue = new Array(options.length).fill(false);
  if (value.includes(all[0])) {
    initialValue.fill(true);
  } else {
    initialValue.map((item, index) => {
      return (initialValue[index] = value.includes(options[index].title));
    });
  }
  return initialValue;
}

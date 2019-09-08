export const getModalForNotCriticalErrors = (errors: Array<string>) => {
  let content =
    errors.length &&
    errors.reduce((acc, item, index) => `${acc}\n${index + 1}. ${item}`, "");
  // Здесь вызов модального окна
  alert(content);
};

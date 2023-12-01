const useValidate = (value: string) => {
  const PWD_LETTER:  RegExp = new RegExp(/^(?=.*[a-z])/);
  const PWD_SYMBOL:  RegExp = new RegExp(/^(?=.*[!@#$%])/);
  const PWD_NUMBER:  RegExp = new RegExp(/^(?=.*[0-9])/);
  const PWD_UPPERCASE: RegExp = new RegExp(/^(?=.*[A-Z])/);

  return PWD_SYMBOL.test(value) &&
    PWD_NUMBER.test(value) &&
    PWD_UPPERCASE.test(value) &&
    value.length >= 8;
}

export default useValidate;

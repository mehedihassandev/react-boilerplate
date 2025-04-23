export const isObjectIsNotEmpty = (Params: { [key: string]: unknown }) => {
  return Object.values(Params).some((param) => param !== null && param !== '');
};

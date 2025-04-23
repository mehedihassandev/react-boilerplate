/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounced = (func: Function, millisecond = 300) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, millisecond);
  };
};

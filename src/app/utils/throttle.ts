/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const throttle = (func: Function, delay = 3000) => {
  let toThrottle = false;

  return function (this: any, ...args: any[]) {
    if (!toThrottle) {
      toThrottle = true;
      func.apply(this, args);
      setTimeout(() => {
        toThrottle = false;
      }, delay);
    }
  };
};

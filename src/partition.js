export const partition = (ls, f) => {
  return ls.reduce((accum, cur) => {
    if (accum[accum.length - 1]) {
      const lastStack = accum[accum.length - 1];
      if (f(cur, lastStack)) {
        lastStack.push(cur);
      } else {
        accum.push([cur])
      }
      return accum;
    } else {
      accum.push([cur])
      return accum;
    }
  },[])
}
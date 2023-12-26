const arr = [3, 1, 2];

const subsequence = function (index, ds, subs) {
  if (index >= arr.length) {
    const result = [];
    for (let i = 0; i < ds.length; i++) {
      result.push(ds[i]);
    }
    // console.log(ds);
    subs.push(result);
    return subs;
  }
  ds.push(arr[index]);
  subsequence(index + 1, ds, subs);
  ds.splice(ds.length - 1, 1);
  subsequence(index + 1, ds, subs);
  return subs;
};

console.log(subsequence(0, [], []))

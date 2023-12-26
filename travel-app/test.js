const displaySubArray = function (arr, numBy) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let res = [];
    for (let j = i; j <= i + numBy - 1 && i + numBy <= arr.length; j++) {
      console.log(j, i, i + numBy - 1);
      res.push(arr[j]);
    }
    if (res.length > 0) result.push(res);
  }

  return result;
};
const subArray = displaySubArray([4, 3, 7, 2], 4);
console.log(subArray);

// building the right skills so you can attract your audience by default

// Although I have not done any project by typescript, but I learned it, I observed it, I practiced it independently and I can assure that I will be in good shape to use it in production level code comfortably.

// The basic is to stick to it and things will eventually turns out nicely. You just need to stay in the field and continue with the flow with all the heart and try to understand what you are learning and practicing along the way.

// just like virat kohli does it in the field when his team is in under trouble then he just went on to bat and try to stay in the crease (the Basic) and understand the game, the pitch, the bowlers, the mindgame of opposite players and rotate the strike or adjusting himself by the situation.
// And some time later, the pressure is going to reduce time by time and the game is on again and he got his momentum as well and alongside creates a new game that favors his strength and avoid his weaknesses.
// pretty smart and simple strategy.

// squiggly -- bumpy -- curved

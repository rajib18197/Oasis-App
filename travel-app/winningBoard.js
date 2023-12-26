export const WINNING_COMBINATIONS = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
];

///////////////////// Alternative Options
// context.value = this;
// Object.defineProperty(context, "value", { enumerable: false });
// const value = context.value(...rest);
// delete context.value;
// return value;

Function.prototype.callPolyfil = function (context, ...rest) {
  let fn = this;

  Object.defineProperty(context, "__unique__", {
    value: fn,
    enumerable: false,
    configurable: true,
  });

  const output = context["__unique__"](...rest);
  delete context.__unique__;

  return typeof output !== undefined ? output : undefined;
};

const kevin = {
  fullName: "Kevin Petersen",
  metaSkill: "curiosity",
};

const getTreasure = function () {
  const mapSkillToResult = {
    curiosity: "learn new skill",
    reading: "learn anything you want",
  };

  const valuable = mapSkillToResult[this.metaSkill] || undefined;

  const unique = `${this.fullName} is exploring his ${this.metaSkill} which eventually lead him to ${valuable}`;

  return unique;
};

const rare = getTreasure.callPolyfil(kevin);
console.log(rare);

/***********************************************
================================================
Visual Teachers teaching valuable things through some [[presentation slides / visual slides]]. As a Programmer I like to represent valuable things through some [[Code snippet]] (advanced code snippet of a language but simple if someone deeply knows that language.).

deeply engaged in a subject which has a huge ripple effects and which continuously reminds/nudge/saying me learning not going to stop.
Computer Science - Software Enginner
better learner - better thinker - improve math skills - think rationally - optimised things - always room for improvements (maintainability) - better organizer - better commnication.

You intended to learn a topic which introduced you to 10 diffenerent topics
One action - huge ripple effects
================================================
***********************************************/

// We met with a Very Powerful Person once.

// He was giving us (free) advice to help us grow.

// At the end, he made a big to-do:

// "Let's take a group photo of this moment!"

// It was so smart.

// We left feeling this meeting was special for him, too.

// I never forgot that.

// I recently realized that in every meeting, I have the opportunity to make someone feel BIG or small. This is a simple way to make people feel big.

// - User-friendly design
// - Mobile responsiveness
// - Streamlined user journeys

// They're not just design choices;
// they're business strategies.

// 👉 I'll leave you with a strategy to consider:

// 1. Simplify your design
// 2. Focus on the user
// 3. Constantly evolve and refine

// And watch as your website
// transforms into a user magnet.

// Remember, in the realm of web design,
// simplicity is king.

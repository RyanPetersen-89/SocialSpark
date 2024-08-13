const userNames = [
  "BarkWahlberg",
  "CatDamon",
  "WoofGoldblum",
  "PurrAffleck",
  "SealenaGomez",
  "HowlRudd",
  "RavenMcAdams",
  "PawSchwarzenegger",
  "DuckShepard",
  "MooseWillis",
  "TinaFeyline",
  "RabbitDowneyJr",
  "GiraffeGalifianakis",
  "ElkDeGeneres",
  "BruceFlee",
  "EweJackman",
  "MantisMichele",
  "BillyGoatThorn",
  "OctoWinfrey",
  "RaccoonPhoenix",
];

const thoughts = [
  "I just tried to unlock my front door with my car key fob. Spoiler: It didn't work.",
  "My houseplant is thriving, which means I can probably keep a human alive too, right?",
  "Why does my hair look flawless at home and then turn into a bird's nest when I step outside?",
  "I’m not saying I’m Batman, but have you ever seen me and Batman in the same room?",
  "Just found out that my daily coffee habit has surpassed my monthly rent. Priorities, right?",
  "My superpower is hitting the snooze button without fully waking up.",
  "When life gives you lemons, ask if they come with a refund policy.",
  "Is it just me, or does online shopping feel like a very intense game of 'Will it fit?'",
  "Sometimes I talk to myself, and then we both laugh.",
  "I cleaned my room today, which is basically like hitting the reset button on my life.",
  "My bed is a magical place where I suddenly remember everything I was supposed to do.",
  "I need a six-month vacation, twice a year.",
  "Trying to adult, but I keep getting distracted by glittery things.",
  "They say 'Do what you love.' So, I’m napping.",
  "I don't trip over things, I do random gravity checks.",
  "Just realized I can't remember the last time I did something for the first time.",
  "Every day may not be good, but there's something good in every day.",
  "The best way to predict your future is to hit 'next episode'.",
  "Life is short. Smile while you still have teeth.",
  "I would lose weight, but I don't like losing.",
];

const thoughtReactions = ["Like", "Dislike"];

// get a random item from an array
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// generate a random username by combining two random user names
function randomUsername() {
  return random(userNames) + random(userNames);
}

// generate an array of random thoughts, each with a specified number of reactions
function generateThoughts(count) {
  return Array.from({ length: count }, () => ({
    thoughtText: random(thoughts),
    reactions: generateReactions(2),
  }));
}

// generate reactions for a thought
function generateReactions(count) {
  return Array.from({ length: count }, () => ({
    reactionBody: random(thoughtReactions),
    username: randomUsername(),
  }));
}

module.exports = { randomUsername, generateThoughts, random };
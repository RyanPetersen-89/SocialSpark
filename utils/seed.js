const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { randomUsername, generateThoughts, random } = require("./data");

const NUM_USERS = 20;
const NUM_THOUGHTS = 10;

connection.on("error", (err) => console.error(err));

connection.once("open", async () => {
  console.log("Connected. Starting database seeding...");

  // clear existing data
  await clearCollections(["thoughts", "users"]);

  // create and insert users
  const users = createUsers(NUM_USERS);
  const userData = await User.insertMany(users);

  // create and insert thoughts with associated users
  const thoughts = createThoughts(NUM_THOUGHTS, userData);
  const thoughtData = await Thought.insertMany(thoughts);

  // update users with thoughts and friends
  await updateUsersWithThoughtsAndFriends(userData, thoughtData);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});

// clear specified collections
async function clearCollections(collectionNames) {
  for (const name of collectionNames) {
    const collectionExists = await connection.db
      .listCollections({ name })
      .toArray();
    if (collectionExists.length) {
      await connection.dropCollection(name);
    }
  }
}

// create user objects
function createUsers(count) {
  return Array.from({ length: count }, () => {
    const username = randomUsername();
    return {
      username,
      email: `${username}@gmail.com`.toLowerCase(),
    };
  });
}

// create thought objects with associated users
function createThoughts(count, users) {
  return generateThoughts(count).map((thought) => {
    const user = random(users);
    thought.username = user._id;
    thought.reactions = thought.reactions.map((reaction) => ({
      ...reaction,
      username: random(users)._id,
    }));
    return thought;
  });
}

// update users with associated thoughts and friends
async function updateUsersWithThoughtsAndFriends(users, thoughts) {
  for (const thought of thoughts) {
    const user = users.find(
      (u) => u._id.toString() === thought.username.toString()
    );
    if (user) {
      await User.findByIdAndUpdate(user._id, {
        $push: {
          thoughts: thought,
          friends: random(users),
        },
      });
    }
  }
}
const connection = require("../config/connection");
const { User, Reaction, Thought } = require("../models");
// const { getRandomName, getRandomAssignments } = require('./data');

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const friends = getRandomFriends(20);

    users.push({
      username,
      email,
      friends,
      thoughts,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: "Cool!",
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: [...students],
    reactions,
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

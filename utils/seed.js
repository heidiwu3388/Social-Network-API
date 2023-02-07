const connection = require('../config/connection');
const { User, Thought } = require('../models');

const users = [
  {
    username: "heidi-wu",
    email: "heidiwu@gmail.com",
  },
  {
    username: "triana-deguzman",
    email: "triana@gmail.com",
  },
  {
    username: "hannah-chung",
    email: "hannah@gmail.com",
  },
  {
    username: "fernando-maldonado",
    email: "fernando@gmail.com",
  },
];

// const thoughts = [
//   {
//     thoughText: "Eliptical talk. Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail. Eliptical talk. Look at the sunset, life is amazing, life is beautiful, life is what you make it. We the best. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. We don’t see them, we will never see them. The key is to enjoy life, because they don’t want you to enjoy life. I promise you, they don’t want you to jetski, they don’t want you to smile."
//   },
//   {
//     thoughText: "It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Another one. It’s important to use cocoa butter. It’s the key to more success, why not live smooth? Why live rough? Bless up. The key to more success is to get a massage once a week, very important, major key, cloth talk. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion!"
//   },
//   {
//     thoughText: "Every chance I get, I water the plants, Lion! Another one. To be successful you’ve got to work hard, to make history, simple, you’ve got to make it. You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Hammock talk come soon. They key is to have every key, the key to open every door. Cloth talk. How’s business? Boomin. In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key. Find peace, life is like a water fall, you’ve gotta flow. Special cloth alert."
//   },
//   {
//     thoughText: "It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Wraith talk. Let’s see what Chef Dee got that they don’t want us to eat. Bless up. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Eliptical talk. Mogul talk. We the best. Celebrate success right, the only way, apple. Congratulations, you played yourself. Congratulations, you played yourself. They key is to have every key, the key to open every door."
//   },
// ];


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany(users);
  //await Thought.collection.insertMany(thoughts);

  //display results
  console.table(users);
  //console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

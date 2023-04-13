require('dotenv').config();
const db = require('../config/connection');
// added User and Room imports
const User = require('../models/User');
const Room = require('../models/Room');
const userSeeds = require('./userSeeds.json');
const roomSeeds = require('./roomSeeds.json');

db.once('open', async () => {
  try {
    await Room.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < roomSeeds.length; i++) {
      const { _id, ownerEmail } = await Room.create(roomSeeds[i]);
      const user = await User.findOneAndUpdate(
        { email: ownerEmail },
        {
          $addToSet: {
            rooms: _id,
          },
        }
      );
      if (!user) {
        throw new Error(`User with email ${ownerEmail} not found`);
      }
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

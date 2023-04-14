const { Schema, model } = require('mongoose');

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Room = model('Room', roomSchema);

module.exports = Room;

import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    messages: {
        type: [{
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                required: true,
            },
        }],
        required: true,
        default: [],
    },
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        required: true,
        default: [],
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
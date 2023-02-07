import mongoose from "mongoose";

const Room = mongoose.model('Room', new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}))

export default Room
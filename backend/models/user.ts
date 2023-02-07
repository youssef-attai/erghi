import mongoose from "mongoose";

const User =  mongoose.model('User', new mongoose.Schema({
    profile: {
        type: {
            username: String,
            bio: String,
            _id: false
        },
        required: true
    },
    rooms: {
        type: [{
            _id: false,
            roomId: {
                type: mongoose.Types.ObjectId,
                ref: 'Room'
            },
            profile: {
                username: String,
                bio: String
            }
        }],
        default: []
    },
    password: {
        type: String,
        required: true
    },
    refresh: {
        type: String,
        required: true
    }
}));

export default User
import mongoose from "mongoose";

export default mongoose.model('User', new mongoose.Schema({
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
            rid: {
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
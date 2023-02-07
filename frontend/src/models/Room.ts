import Profile from "./Profile";

export default interface UserRoom {
    roomId: string,
    roomName: string,
    profile?: Profile
    members: string[]
}
import Profile from "./Profile";
import UserRoom from "./Room";

export default interface User {
    profile: Profile,
    rooms: UserRoom[]
}
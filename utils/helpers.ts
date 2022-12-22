import {IChat, IUser} from "../types/data";

export const getOtherUser = (user: IUser, chat: IChat) => {
    if (user.id === chat.user1) return chat.user2;
    else return chat.user2;
};

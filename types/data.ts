export interface IUserRegister {}

export interface IUserLogin {}

export const EGender_Names = ["مرد", "زن"];

export enum EGender {
    MAN,
    WOMAN,
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    gender: EGender;
    email: string;
    password: string;
    createDate: Date;
    charge: number;
    package: {
        checkDate: Date;
        numberOfDays: number;
    };
}

export enum EChatType {
    Private,
    Group,
    Channel,
}

export interface IChat {
    id: string;
    users: string[];
    name: string;
    type: EChatType;
}

export enum EMessageStatus {
    PENDING,
    NOT_SENDED,
    SENDED,
    SEEN,
}
export interface IMessage {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    status: EMessageStatus;
    date: string;
    deviceId?: string;
}

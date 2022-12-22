import {EMessageStatus, IMessage} from "../types/data";

export const rawTextToMessage = (text: string) => {
    const message: IMessage = {
        chatId: "",
        content: "",
        date: "",
        id: "",
        senderId: "",
        status: 0,
    };
    if (text.startsWith("$")) text = text.substring(1);
    if (text.endsWith("$")) text = text.substring(0, text.length - 1);
    console.log("raw message => ", text);
    if (text?.length > 0) {
        text.split("&").map((kvText) => {
            const objKey = kvText.split("=")[0];
            const objValue = kvText.split("=")[1];
            if (objKey === "status") {
                message["status"] = Number(objValue) as EMessageStatus;
            } else if (objKey === "id") {
                message["id"] = objValue;
            } else if (objKey === "chatId") {
                message["chatId"] = objValue;
            } else if (objKey === "text") {
                message["content"] = objValue;
            } else if (objKey === "content") {
                message["content"] = objValue;
            } else if (objKey === "senderId") {
                message["senderId"] = objValue;
            } else if (objKey === "date") {
                message["date"] = objValue;
            }
        });
    }
    return message;
};

export const messageToRawText = (message: IMessage) => {
    return `$${Object.entries(message)
        .map(([k, v]) => `${k}=${v}`)
        .join("&")}&$`; // "$k1=v1&k2=v2&k3=v3&$"
};

export const rawTextToMessages = (text: string) => {
    const messages: IMessage[] = [];
    console.log("raw messages => ", text);
    text.split("\n").forEach((txt) => {
        if (txt?.length > 0) {
            const msg = rawTextToMessage(txt);
            if (msg.id.length > 0 && msg.chatId.length > 0) {
                messages.push(msg);
            }
        }
    });
    return messages;
};

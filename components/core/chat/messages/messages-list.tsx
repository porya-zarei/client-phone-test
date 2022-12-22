import {FC} from "react";
import {StyleSheet, FlatList} from "react-native";
import {IMessage, IUser} from "../../../../types/data";
import CText from "../../text";
import Message from "./message";

interface MessagesListProps {
    messages: IMessage[];
    user: IUser;
}

const styles = StyleSheet.create({
    containerFlatList: {
        height: "100%",
        maxHeight: "100%",
        width: "100%",
    },
});

const MessagesList: FC<MessagesListProps> = ({messages, user}) => {
    return (
        <FlatList
            style={{...styles.containerFlatList}}
            data={messages}
            renderItem={(info) => (
                <Message
                    key={info.item.id}
                    message={info.item}
                    align={user.id === info.item.senderId ? "RIGHT" : "LEFT"}
                />
            )}></FlatList>
    );
};

export default MessagesList;

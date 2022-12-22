import {FC} from "react";
import {StyleSheet, useWindowDimensions} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {useUserContext} from "../../../../contexts/user-context";
import {IChat} from "../../../../types/data";
import ChatListItem from "./chat-list-item";

interface ChatListProps {
    chats: IChat[];
    onPressItem?: (item: IChat) => void;
}

const styles = StyleSheet.create({
    chatList: {
        flex: 1,
    },
});

const ChatList: FC<ChatListProps> = ({chats, onPressItem}) => {
    const {height} = useWindowDimensions();
    const {user} = useUserContext();
    return (
        <FlatList
            data={
                [
                    {
                        id: "123",
                        name: "سرور مرکزی",
                        user1: user.id,
                        user2: "server",
                    },
                    ...chats,
                ] as IChat[]
            }
            renderItem={(info) => (
                <ChatListItem onPress={onPressItem} info={info} />
            )}
            style={{...styles.chatList, maxHeight: (height * 3) / 4}}
        />
    );
};

export default ChatList;

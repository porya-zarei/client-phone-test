import {FC, useEffect} from "react";
import {StyleSheet} from "react-native";
import {useChatsContext} from "../../../contexts/chats-context";
import {useNotificationsContext} from "../../../contexts/notifications-context";
import {useSocketContext} from "../../../contexts/socket-context";
import {useUserContext} from "../../../contexts/user-context";
import {useAppTheme} from "../../../theme";
import {EMessageStatus, IMessage} from "../../../types/data";
import MessagesList from "../../core/chat/messages/messages-list";
import CView from "../../core/view";

interface ChatMainProps {}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        minHeight: "65%",
        paddingTop: 200,
        paddingBottom: 70,
    },
});

const ChatMain: FC<ChatMainProps> = () => {
    const {user} = useUserContext();
    const {messages, selectedChat} = useChatsContext();
    const {checkNewMessages} = useSocketContext();
    const {notify} = useNotificationsContext();
    // const {colors, dark} = useAppTheme();
    useEffect(() => {
        notify({
            content: "دریافت پیام های جدید",
            autoClose: true,
            duration: 4000,
            type: "info",
        });
        selectedChat?.id && checkNewMessages(selectedChat?.id);
    }, [selectedChat?.id]);
    return (
        <CView style={styles.main}>
            <MessagesList
                user={user}
                messages={messages.filter((m) => m.chatId === selectedChat?.id)}
            />
        </CView>
    );
};

export default ChatMain;

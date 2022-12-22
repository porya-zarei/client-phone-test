import {FC, useState} from "react";
import {StyleSheet} from "react-native";
import {Ionicons, AntDesign} from "@expo/vector-icons";
import {useChatsContext} from "../../../contexts/chats-context";
import {useUserContext} from "../../../contexts/user-context";
import {darken, lighten, useAppTheme} from "../../../theme";
import CButton from "../../core/button";
import CInput from "../../core/input";
import CView from "../../core/view";
import {uuidGenerator} from "../../../utils/id-generator";
import {EMessageStatus} from "../../../types/data";
import {useSocketContext} from "../../../contexts/socket-context";

interface ChatFooterProps {
    handleFocused: () => void;
    handleUnFocused: () => void;
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        height: 70,
        width: "100%",
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: 10,
        bottom: 0,
    },
    inputContainer: {
        height: "100%",
        width: "60%",
        paddingVertical: 7,
    },
    input: {},
    submitBtnContainer: {
        width: "17%",
        height: "100%",
    },
    submitBtn: {
        height: "100%",
    },
    submitBtnText: {},
    feedbackBtnContainer: {
        width: "17%",
        height: "100%",
    },
    feedbackBtn: {
        height: "100%",
    },
    feedbackBtnText: {},
});

const ChatFooter: FC<ChatFooterProps> = ({handleFocused, handleUnFocused}) => {
    const {user, isUserLogedIn} = useUserContext();
    const {colors, dark} = useAppTheme();
    const {selectedChat, changeMessages} = useChatsContext();
    const {sendMessage} = useSocketContext();
    const [messageStatus, setMessageStatus] = useState(false);
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        if (message.length > 0 && isUserLogedIn()) {
            // changeMessages((p) => [
            //     ...p,
            //     {
            //         chatId: selectedChat?.id ?? "",
            //         content: message,
            //         date: new Date().toString(),
            //         id: uuidGenerator(),
            //         senderId: user.id,
            //         status: EMessageStatus.NOT_SENDED,
            //     },
            // ]);
            const result = await sendMessage({
                chatId: selectedChat?.id ?? "",
                content: message,
                date: new Date().toString(),
                id: uuidGenerator(),
                senderId: user.id,
                status: EMessageStatus.NOT_SENDED,
                deviceId: "1",
            });
            result && setMessage("");
        }
    };

    return (
        <CView
            style={{
                ...styles.footer,
                backgroundColor: dark
                    ? darken(colors.grayDark)
                    : lighten(colors.grayLight),
            }}>
            <CView style={{...styles.feedbackBtnContainer}}>
                <CButton
                    btnStyle={{
                        ...styles.feedbackBtn,
                        backgroundColor: "transparent",
                    }}
                    textStyle={{...styles.submitBtnText}}
                    onPress={() => {
                        setMessageStatus((p) => !p);
                    }}
                    icon={
                        <AntDesign
                            name={messageStatus ? "swap" : "swapright"}
                            size={30}
                            color={colors.text}
                        />
                    }
                />
            </CView>
            <CView style={{...styles.inputContainer}}>
                <CInput
                    onFocus={handleFocused}
                    onBlur={handleUnFocused}
                    text={message}
                    onChangeText={setMessage}
                />
            </CView>
            <CView style={{...styles.submitBtnContainer}}>
                <CButton
                    onPress={() => {
                        handleSendMessage();
                    }}
                    textStyle={{...styles.submitBtnText}}
                    btnStyle={{
                        ...styles.submitBtn,
                        backgroundColor: "transparent",
                    }}
                    icon={
                        <Ionicons name="send" size={30} color={colors.text} />
                    }
                />
            </CView>
        </CView>
    );
};

export default ChatFooter;

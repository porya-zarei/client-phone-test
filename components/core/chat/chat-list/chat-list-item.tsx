import {FC, useState} from "react";
import {
    ImageBackground,
    ListRenderItemInfo,
    Pressable,
    StyleSheet,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {lighten, useAppTheme} from "../../../../theme";
import {EGender, IChat} from "../../../../types/data";
import CButton from "../../button";
import CText from "../../text";
import CView from "../../view";
import {useUserContext} from "../../../../contexts/user-context";
import {useChatsContext} from "../../../../contexts/chats-context";
import {getOtherUser} from "../../../../utils/helpers";
import {useNotificationsContext} from "../../../../contexts/notifications-context";
import CInput from "../../input";

interface ChatListItemProps {
    info: ListRenderItemInfo<IChat>;
    onPress?: (item: IChat) => void;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    chatListItem: {
        height: 80,
        width: "100%",
        flexDirection: "row-reverse",
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginLeft: 10,
        overflow: "hidden",
    },
    content: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 10,
    },
    contentText: {
        marginVertical: 5,
    },
    footer: {
        width: "100%",
        height: 40,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    nameEditContainer: {
        width: "100%",
        height: 50,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    nameEditInputContainer: {
        width: "70%",
        height: "100%",
    },
    nameEditInput: {},
    saveEditBtn: {
        width: "20%",
    },
});

const ChatListItem: FC<ChatListItemProps> = ({info, onPress}) => {
    const {colors, dark} = useAppTheme();
    const {user} = useUserContext();
    const {notify} = useNotificationsContext();
    const {users, changeChats, changeFilteredChats, changeMessages} =
        useChatsContext();
    const [show, setShow] = useState(false);
    const otherUserId = getOtherUser(user, info.item);
    const otherUser = users.find((u) => u.id === otherUserId);
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(info.item.name);
    return (
        <CView style={{...styles.container}}>
            <Pressable
                key={info.item.id}
                onPress={(e) => {
                    onPress?.(info.item);
                }}
                onLongPress={() => {
                    setShow((p) => !p);
                }}
                style={{
                    ...styles.chatListItem,
                    backgroundColor: dark
                        ? lighten(colors.grayDark)
                        : lighten(colors.grayLight),
                }}>
                <CView
                    style={{
                        ...styles.avatar,
                        backgroundColor: colors.danger,
                    }}>
                    <ImageBackground
                        source={
                            otherUser
                                ? otherUser.gender === EGender.MAN
                                    ? require("../../../../assets/images/avatar-man-2.png")
                                    : require("../../../../assets/images/avatar-woman-2.png")
                                : require("../../../../assets/avatar.png")
                        }
                        style={{height: "100%", width: "100%"}}
                    />
                </CView>
                <CView style={{...styles.content}}>
                    <CText style={{...styles.contentText}}>
                        نام : {info.item.name}
                    </CText>
                    <CText style={{...styles.contentText}}>
                        ایدی : {info.item.id}
                    </CText>
                </CView>
            </Pressable>
            {show && (
                <CView style={{...styles.footer}}>
                    <CButton
                        icon={
                            <MaterialCommunityIcons
                                name="delete"
                                size={30}
                                color={colors.danger}
                            />
                        }
                        onPress={() => {
                            changeChats((p) =>
                                p.filter((c) => c.id !== info.item.id),
                            );
                            changeFilteredChats((p) =>
                                p.filter((c) => c.id !== info.item.id),
                            );
                            changeMessages((m) =>
                                m.filter((c) => c.chatId !== info.item.id),
                            );
                            notify({
                                content: "چت حذف شد",
                            });
                        }}
                    />
                    <CButton
                        icon={
                            <MaterialCommunityIcons
                                name="playlist-edit"
                                size={30}
                                color={colors.warning}
                            />
                        }
                        onPress={() => {
                            setIsEdit((p) => !p);
                        }}
                    />
                </CView>
            )}
            {show && isEdit && (
                <CView style={{...styles.nameEditContainer}}>
                    <CInput
                        text={newName}
                        onChangeText={setNewName}
                        containerStyle={{
                            ...styles.nameEditInputContainer,
                            backgroundColor: colors.light,
                        }}
                        inputStyle={{
                            ...styles.nameEditInput,
                            color: colors.text,
                        }}
                    />
                    <CButton
                        icon={
                            <MaterialCommunityIcons
                                name="checkbox-marked-outline"
                                size={30}
                                color={colors.info}
                            />
                        }
                        btnStyle={{...styles.saveEditBtn}}
                        onPress={() => {
                            changeChats((p) => {
                                const items = [...p];
                                const index = items.findIndex(
                                    (it) => it.id === info.item.id,
                                );
                                if (index > -1) {
                                    items.splice(index, 1, {
                                        ...info.item,
                                        name: newName,
                                    });
                                }
                                return [...items];
                            });
                            changeFilteredChats((p) => {
                                const items = [...p];
                                const index = items.findIndex(
                                    (it) => it.id === info.item.id,
                                );
                                if (index > -1) {
                                    items.splice(index, 1, {
                                        ...info.item,
                                        name: newName,
                                    });
                                }
                                return [...items];
                            });
                            notify({
                                content: "چت ویرایش شد",
                            });
                            setIsEdit(false);
                        }}
                    />
                </CView>
            )}
        </CView>
    );
};

export default ChatListItem;

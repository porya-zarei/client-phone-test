import {FC, useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {useAppTheme} from "../../../theme";
import CInput from "../../core/input";
import NewChatModal from "./new-chat-modal";
import CText from "../../core/text";
import CView from "../../core/view";
import {IChat} from "../../../types/data";
import ChatList from "../../core/chat/chat-list";
import {useNavigation} from "@react-navigation/native";
import {useChatsContext} from "../../../contexts/chats-context";
import HomeBadges from "./badges";
import SearchBar from "./search-bar";
import Notifications from "../../core/notifications";

interface HomeScreenProps {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    viewContainer: {
        flex: 1,
        height: "100%",
        paddingTop: 30,
        width: "100%",
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: "100%",
    },
    headerTitle: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
    },
    main: {
        flex: 9,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    chatListContainer: {
        flex: 1,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    footer: {
        flex: 2,
        minHeight: 100,
        justifyContent: "center",
        alignItems: "center",
    },
});

const HomeScreen: FC<HomeScreenProps> = () => {
    const navigator = useNavigation();
    const {changeSelectedChat} = useChatsContext();
    const {colors} = useAppTheme();
    const {filteredChats} = useChatsContext();

    const handlePress = (item: IChat) => {
        changeSelectedChat(item);
        navigator.navigate("chat-modal" as never);
    };

    return (
        <CView
            style={{
                ...styles.container,
                backgroundColor: colors.light,
            }}>
            <NewChatModal />
            <CView style={styles.viewContainer}>
                <CView style={styles.header}>
                    <CView style={styles.headerTitle}>
                        <CText style={{...styles.title, color: colors.text}}>
                            داشبورد
                        </CText>
                    </CView>
                    <HomeBadges />
                </CView>
                <CView style={styles.main}>
                    <SearchBar />
                    <CView style={styles.chatListContainer}>
                        <ChatList
                            onPressItem={handlePress}
                            chats={filteredChats}
                        />
                    </CView>
                </CView>
            </CView>
        </CView>
    );
};

export default HomeScreen;

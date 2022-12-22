import {FC} from "react";
import {ImageBackground, StyleSheet, ViewStyle} from "react-native";
import Animated from "react-native-reanimated";
import {useChatsContext} from "../../../contexts/chats-context";
import {useUserContext} from "../../../contexts/user-context";
import {darken, lighten, useAppTheme} from "../../../theme";
import CText from "../../core/text";
import CView from "../../core/view";

interface AnimatedStyle {
    transform: {
        translateX: number;
        translateY: number;
    };
}

interface ChatHeaderProps {
    avatarAnimatedStyles: ViewStyle;
    titleAnimatedStyle: ViewStyle;
}
const styles = StyleSheet.create({
    header: {
        height: 200,
        position:"absolute",
        top:0,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 10,
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 35,
        overflow: "hidden",
    },
});

const ChatHeader: FC<ChatHeaderProps> = ({
    avatarAnimatedStyles,
    titleAnimatedStyle,
}) => {
    const {user} = useUserContext();
    const {colors, dark} = useAppTheme();
    const {selectedChat} = useChatsContext();
    return (
        <CView
            style={{
                ...styles.header,
                backgroundColor: dark
                    ? darken(colors.grayDark)
                    : lighten(colors.grayLight),
            }}>
            <Animated.View style={[styles.avatar, avatarAnimatedStyles]}>
                <ImageBackground
                    source={require("../../../assets/avatar.png")}
                    style={{height: "100%", width: "100%"}}
                />
            </Animated.View>
            <CView style={styles.titleContainer}>
                <Animated.Text
                    style={[
                        styles.title,
                        titleAnimatedStyle,
                        {color: colors.text},
                    ]}>
                    {selectedChat?.name}
                </Animated.Text>
            </CView>
        </CView>
    );
};

export default ChatHeader;

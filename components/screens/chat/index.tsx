import {FC} from "react";
import {StyleSheet, useWindowDimensions} from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {useAppTheme} from "../../../theme";
import CView from "../../core/view";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import ChatMain from "./chat-main";

interface ChatScreenProps {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        height: "100%",
    },
});

const ChatScreen: FC<ChatScreenProps> = () => {
    const {width} = useWindowDimensions();
    const {colors} = useAppTheme();
    const avatarX = useSharedValue(0);
    const avatarY = useSharedValue(0);
    const titleX = useSharedValue(0);
    const titleY = useSharedValue(0);
    const handleFocused = () => {
        avatarX.value = withTiming(width / 2 - 60);
        avatarY.value = withTiming(15);
        titleX.value = withTiming(width / 2 - 140);
        titleY.value = withTiming(-30);
    };
    const handleUnFocused = () => {
        avatarX.value = withTiming(0);
        avatarY.value = withTiming(0);
        titleX.value = withTiming(0);
        titleY.value = withTiming(0);
    };

    const avatarAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: avatarX.value},
                {translateY: avatarY.value},
            ],
        };
    });

    const titleAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateX: titleX.value}, {translateY: titleY.value}],
        };
    });

    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <ChatHeader
                avatarAnimatedStyles={avatarAnimatedStyles}
                titleAnimatedStyle={titleAnimatedStyles}
            />
            <ChatMain />
            <ChatFooter
                handleFocused={handleFocused}
                handleUnFocused={handleUnFocused}
            />
        </CView>
    );
};

export default ChatScreen;

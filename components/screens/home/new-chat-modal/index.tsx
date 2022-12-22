import {FC, useState, useRef} from "react";
import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useChatsContext} from "../../../../contexts/chats-context";
import {useUserContext} from "../../../../contexts/user-context";
import {useAppTheme} from "../../../../theme";
import {uuidGenerator} from "../../../../utils/id-generator";
import CButton from "../../../core/button";
import CInput from "../../../core/input";
import {EChatType, IChat} from "../../../../types/data";

interface NewChatModalProps {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flex: 4,
        width: "100%",
        flexDirection: "row-reverse",
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontWeight: "600",
        fontSize: 20,
    },
    main: {
        flex: 6,
        width: "100%",
    },
    startNewChatContainer: {
        flex: 1,
        position: "absolute",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        bottom: 30,
        right: 10,
        shadowOffset: {
            height: 50,
            width: 50,
        },
        shadowRadius: 50,
        shadowColor: "#fff",
        shadowOpacity: 5,
    },
    startNewChatBtn: {
        padding: 5,
    },
    startNewChatBtnText: {},
    inputContainer: {
        margin: 10,
    },
    input: {
        height: 40,
    },
});

const DURATION = 400;

const NewChatModal: FC<NewChatModalProps> = () => {
    const {width, height} = useWindowDimensions();
    const {changeChats, changeFilteredChats} = useChatsContext();
    const {user} = useUserContext();
    const {colors, dark} = useAppTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [chatName, setChatName] = useState("");
    const [receiververId, setReceiverId] = useState("");

    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offsetX.value},
                {translateY: offsetY.value},
            ],
        };
    });

    const handleOpen = () => {
        offsetX.value = withTiming(-width / 6, {duration: DURATION});
        offsetY.value = withTiming(-height / 3, {duration: DURATION});
        setTimeout(() => {
            setIsOpen(true);
        }, DURATION);
    };
    const handleClose = () => {
        offsetX.value = withTiming(0, {duration: DURATION});
        offsetY.value = withTiming(0, {duration: DURATION});
        setTimeout(() => {
            setIsOpen(false);
        }, DURATION);
    };

    const handleStartNewChat = () => {
        if (chatName?.length >= 4 && receiververId?.length >= 4) {
            const newChat: IChat = {
                name: chatName,
                users: [user.id, receiververId],
                id: uuidGenerator(),
                type: EChatType.Private,
            };
            changeChats((p) => [...p, newChat]);
            changeFilteredChats((p) => [...p, newChat]);
            handleClose();
        }
    };

    return (
        <Animated.View
            style={[
                styles.startNewChatContainer,
                animatedStyles,
                {
                    backgroundColor: isOpen
                        ? dark
                            ? colors.grayDark
                            : colors.grayLight
                        : "transparent",
                    borderRadius: 10,
                },
            ]}>
            <View style={{...styles.container, width: isOpen ? 200 : "auto"}}>
                <View style={{...styles.header}}>
                    <CButton
                        btnStyle={{
                            ...styles.startNewChatBtn,
                            backgroundColor: isOpen
                                ? colors.danger
                                : colors.primaryLight,
                            width: 50,
                            height: 50,
                        }}
                        textStyle={{
                            ...styles.startNewChatBtnText,
                            color: dark ? colors.dark : colors.light,
                        }}
                        title={""}
                        icon={
                            isOpen ? (
                                <MaterialCommunityIcons
                                    name="close"
                                    size={24}
                                    color={colors.text}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="open-in-new"
                                    size={24}
                                    color={colors.text}
                                    style={{transform: [{rotate: "-90deg"}]}}
                                />
                            )
                        }
                        onPress={() => (isOpen ? handleClose() : handleOpen())}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={{...styles.title, color: colors.text}}>
                            گفت و گو جدید
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        ...styles.main,
                        display: isOpen ? "flex" : "none",
                        // backgroundColor: isOpen ? colors.light : "transparent",
                    }}>
                    {isOpen && (
                        <CInput
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            text={receiververId}
                            onChangeText={setReceiverId}
                            placeholder="ایدی کاربر"
                            placeHolderTextColor={colors.text}
                        />
                    )}
                    {isOpen && (
                        <CInput
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            text={chatName}
                            onChangeText={setChatName}
                            placeholder="نام گفت و گو"
                            placeHolderTextColor={colors.text}
                        />
                    )}
                    {isOpen && (
                        <CButton
                            btnStyle={{
                                ...styles.startNewChatBtn,
                                backgroundColor: colors.primaryLight,
                            }}
                            textStyle={{
                                ...styles.startNewChatBtnText,
                                color: dark ? colors.dark : colors.light,
                            }}
                            title="شروع"
                            onPress={handleStartNewChat}
                        />
                    )}
                </View>
            </View>
        </Animated.View>
    );
};

export default NewChatModal;

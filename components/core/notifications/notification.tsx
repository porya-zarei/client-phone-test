import {FC} from "react";
import {StyleSheet} from "react-native";
import Animated, {BounceInLeft} from "react-native-reanimated";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import {useAppTheme} from "../../../theme";
import {INotification} from "../../../types/view";
import CText from "../text";
import CView from "../view";
import CButton from "../button";
import {useNotificationsContext} from "../../../contexts/notifications-context";

interface NotificationProps {
    notification: INotification;
}

const ICON_SIZE = 20;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        padding: 10,
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        alignItems: "center",
        elevation: 10,
        borderRadius: 15,
        marginVertical: 5,
        borderWidth: 2,
        zIndex: 100,
    },
    iconContainer: {
        width: "10%",
    },
    contentContainer: {
        width: "80%",
    },
    content: {},
    btnContainer: {
        width: "10%",
    },
    btn: {},
});

const Notification: FC<NotificationProps> = ({notification}) => {
    const {dark, colors} = useAppTheme();
    const {unNotify} = useNotificationsContext();
    let icon = null;
    switch (notification.type) {
        case "warning":
        case "info":
            icon = (
                <MaterialCommunityIcons
                    name="information"
                    size={ICON_SIZE}
                    color={colors.text}
                />
            );
            break;
        case "danger":
            icon = (
                <MaterialCommunityIcons
                    name="alert-decagram"
                    size={ICON_SIZE}
                    color={colors.text}
                />
            );
            break;
        case "dark":
        case "light":
            icon = notification.icon ?? (
                <MaterialCommunityIcons
                    name="message-star"
                    size={ICON_SIZE}
                    color={colors.text}
                />
            );
            break;
        default:
            icon = (
                <MaterialCommunityIcons
                    name="message-star"
                    size={ICON_SIZE}
                    color={colors.text}
                />
            );
            break;
    }
    return (
        <Animated.View
            entering={BounceInLeft}
            // exiting={SlideOutRight}
            style={[
                styles.container,

                {
                    backgroundColor: notification?.type
                        ? colors[notification.type]
                        : colors.light,
                    borderColor: colors.text,
                },
            ]}>
            <CView style={{...styles.btnContainer}}>
                <CButton
                    icon={
                        <MaterialCommunityIcons
                            name="close-box-multiple"
                            size={ICON_SIZE}
                            color={colors.text}
                        />
                    }
                    onPress={() => {
                        unNotify(notification.id);
                    }}
                />
            </CView>
            <CView style={{...styles.contentContainer}}>
                <CText style={{...styles.content, color: colors.text}}>
                    {notification.content}
                </CText>
            </CView>
            <CView style={{...styles.iconContainer}}>{icon}</CView>
        </Animated.View>
    );
};

export default Notification;

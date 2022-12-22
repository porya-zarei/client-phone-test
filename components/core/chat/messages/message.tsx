import {FC} from "react";
import {StyleSheet, Text} from "react-native";
import * as Clipboard from "expo-clipboard";
import {lighten, useAppTheme} from "../../../../theme";
import {IMessage} from "../../../../types/data";
import CheckMark from "../../check-mark";
import CText from "../../text";
import CView from "../../view";
import {useNotificationsContext} from "../../../../contexts/notifications-context";

interface MessageProps {
    align: "RIGHT" | "LEFT";
    message: IMessage;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        padding: 10,
    },
    main: {
        maxWidth: "70%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
    },
    contentContainer: {
        width: "100%",
        padding: 5,
    },
    content: {},
    footer: {
        width: "100%",
        height: 14,
        fontSize: 12,
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    statusContainer: {
        marginHorizontal: 3,
    },
    status: {},
    dateContainer: {
        marginHorizontal: 3,
    },
    date: {
        fontSize: 10,
    },
});

const Message: FC<MessageProps> = ({align, message}) => {
    const {colors, dark} = useAppTheme();
    const {notify} = useNotificationsContext();
    console.log("message => ",message);
    return (
        <CView
            style={{
                ...styles.container,
                justifyContent: align === "LEFT" ? "flex-start" : "flex-end",
            }}>
            <CView
                style={{
                    ...styles.main,
                    backgroundColor: dark ? colors.grayDark : colors.grayLight,
                }}>
                <CView style={{...styles.contentContainer}}>
                    <CText
                        onLongPress={() => {
                            Clipboard?.setStringAsync?.(message.content);
                            notify({
                                content: "پیام کپی شد",
                                draggable: false,
                                duration: 2000,
                                autoClose: true,
                                type: "info",
                            });
                        }}>
                        {message.content}
                    </CText>
                </CView>
                <CView
                    style={{
                        ...styles.footer,
                        // backgroundColor: colors.danger,
                    }}>
                    <CView style={{...styles.statusContainer}}>
                        <CheckMark
                            status={message.status}
                            color={
                                dark
                                    ? lighten(colors.grayLight)
                                    : lighten(colors.grayDark)
                            }
                            size={12}
                        />
                    </CView>
                    <CView style={{...styles.dateContainer}}>
                        <Text
                            style={{
                                ...styles.date,
                                color: dark
                                    ? lighten(colors.grayLight)
                                    : lighten(colors.grayDark),
                            }}>
                            {message.date.match("^(.*) GMT+.*$")?.[1]}
                        </Text>
                    </CView>
                </CView>
            </CView>
        </CView>
    );
};

export default Message;

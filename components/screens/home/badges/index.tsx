import {FC} from "react";
import {StyleSheet, ScrollView} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CButton from "../../../core/button";
import CView from "../../../core/view";
import {EThemeMode, useViewContext} from "../../../../contexts/view-context";
import {useAppTheme} from "../../../../theme";
import {useNavigation} from "@react-navigation/native";
import DeviceConnectionBadge from "./device-connection-badge";
import {useNotificationsContext} from "../../../../contexts/notifications-context";
import {useSocketContext} from "../../../../contexts/socket-context";

interface HomeBadgesProps {}

const styles = StyleSheet.create({
    headerBadgesContainer: {
        overflow: "scroll",
        height: 90,
        maxHeight: 90,
    },
    headerBadge: {
        height: 80,
        width: 80,
        margin: 5,
        borderRadius: 10,
        opacity: 0.5,
    },
    headerBadgeBtn: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

const ICON_SIZE = 40;

const HomeBadges: FC<HomeBadgesProps> = () => {
    const navigation = useNavigation<any>();
    const {changeThemeMode, themeMode} = useViewContext();
    const {colors} = useAppTheme();
    const {notify} = useNotificationsContext();
    const {checkConnectionToServer, sendMessagesToServer} = useSocketContext();
    const handleChangeTheme = () => {
        changeThemeMode((p) =>
            p === EThemeMode.DARK ? EThemeMode.LIGHT : EThemeMode.DARK,
        );
    };
    return (
        <ScrollView
            contentContainerStyle={{
                flexDirection: "row-reverse",
                direction: "rtl",
            }}
            horizontal={true}
            style={styles.headerBadgesContainer}>
            <CView
                style={{
                    ...styles.headerBadge,
                    backgroundColor: colors.grayLight,
                }}>
                <CButton
                    onPress={() => sendMessagesToServer()}
                    // textStyle={{...styles.submitBtnText}}
                    btnStyle={{
                        ...styles.headerBadgeBtn,
                    }}
                    icon={
                        <MaterialCommunityIcons
                            name="upload"
                            size={ICON_SIZE}
                            color={colors.text}
                        />
                    }
                />
            </CView>
            <CView
                style={{
                    ...styles.headerBadge,
                    backgroundColor: colors.grayLight,
                }}>
                <CButton
                    onPress={handleChangeTheme}
                    // textStyle={{...styles.submitBtnText}}
                    btnStyle={{
                        ...styles.headerBadgeBtn,
                    }}
                    icon={
                        <MaterialCommunityIcons
                            name="theme-light-dark"
                            size={ICON_SIZE}
                            color={colors.text}
                            style={{
                                transform: [
                                    {
                                        rotate:
                                            themeMode === EThemeMode.DARK
                                                ? "0deg"
                                                : "180deg",
                                    },
                                ],
                            }}
                        />
                    }
                />
            </CView>
            <DeviceConnectionBadge iconSize={ICON_SIZE} />
            <CView
                style={{
                    ...styles.headerBadge,
                    backgroundColor: colors.grayLight,
                }}>
                <CButton
                    onPress={() => {
                        checkConnectionToServer();
                    }}
                    // textStyle={{...styles.submitBtnText}}
                    btnStyle={{
                        ...styles.headerBadgeBtn,
                    }}
                    icon={
                        <MaterialCommunityIcons
                            name="satellite-variant"
                            size={ICON_SIZE}
                            color={colors.text}
                        />
                    }
                />
            </CView>
            <CView
                style={{
                    ...styles.headerBadge,
                    backgroundColor: colors.grayLight,
                }}>
                <CButton
                    onPress={() => navigation?.openDrawer?.()}
                    // textStyle={{...styles.submitBtnText}}
                    btnStyle={{
                        ...styles.headerBadgeBtn,
                    }}
                    icon={
                        <MaterialCommunityIcons
                            name="menu"
                            size={ICON_SIZE}
                            color={colors.text}
                        />
                    }
                />
            </CView>
        </ScrollView>
    );
};

export default HomeBadges;

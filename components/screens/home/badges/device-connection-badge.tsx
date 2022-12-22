import {FC} from "react";
import {StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useAppTheme} from "../../../../theme";
import CButton from "../../../core/button";
import CView from "../../../core/view";
import {useSocketContext} from "../../../../contexts/socket-context";

interface DeviceConnectionBadgeProps {
    iconSize: number;
}

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

const DeviceConnectionBadge: FC<DeviceConnectionBadgeProps> = ({iconSize}) => {
    const {colors} = useAppTheme();
    const {isSocketConnected, checkConnectionToDevice} = useSocketContext();
    return (
        <CView
            style={{
                ...styles.headerBadge,
                backgroundColor: colors.grayLight,
            }}>
            <CButton
                onPress={() => {
                    checkConnectionToDevice();
                }}
                btnStyle={{
                    ...styles.headerBadgeBtn,
                }}
                icon={
                    <MaterialCommunityIcons
                        name={
                            isSocketConnected ? "lan-connect" : "lan-disconnect"
                        }
                        size={iconSize}
                        color={colors.text}
                    />
                }
            />
        </CView>
    );
};

export default DeviceConnectionBadge;

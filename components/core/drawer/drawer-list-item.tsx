import {FC, ReactNode} from "react";
import {StyleSheet} from "react-native";
import CText from "../text";
import CView from "../view";

interface DrawerListItemProps {
    label: string;
    onPress: () => void;
    icon: ReactNode;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        padding: 5,
        flexWrap:"nowrap"
    },
    labelContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    label: {},
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {},
});

const DrawerListItem: FC<DrawerListItemProps> = ({label, icon, onPress}) => {
    return (
        <CView>
            <CView style={{...styles.iconContainer}}>{icon}</CView>
            <CView style={{...styles.labelContainer}}>
                <CText style={{...styles.label}}>{label}</CText>
            </CView>
        </CView>
    );
};

export default DrawerListItem;

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import {Octicons} from "@expo/vector-icons";
import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {FC} from "react";
import {EThemeMode, useViewContext} from "../../../contexts/view-context";
import {useAppTheme} from "../../../theme";
import DrawerListItem from "./drawer-list-item";

interface DrawerContentProps extends DrawerContentComponentProps {}

const DrawerContent: FC<DrawerContentProps> = (props) => {
    const {changeThemeMode, themeMode} = useViewContext();
    const {colors} = useAppTheme();
    return (
        <DrawerContentScrollView
            style={{backgroundColor: colors.light}}
            {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default DrawerContent;

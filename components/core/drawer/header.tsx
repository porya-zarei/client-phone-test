import {DrawerNavigationProp} from "@react-navigation/drawer";
import {ParamListBase} from "@react-navigation/native";
import {FC} from "react";
import {StyleProp, ViewStyle, View} from "react-native";
import CButton from "../button";
import CView from "../view";

interface DrawerHeaderProps {
    style: StyleProp<ViewStyle>;
    title: string;
    navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
}

const DrawerHeader: FC<DrawerHeaderProps> = ({title, style, navigation}) => {
    return (
        <CView
            style={{
                ...(style as object),
                display: "none",
                width: "100%",
                height: 60,
                padding: 8,
                zIndex: 100,
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
            <CView>
                <CButton
                    title="|||"
                    onPress={() => navigation.openDrawer()}
                    btnStyle={{
                        backgroundColor: "transparent",
                        padding: 2,
                    }}
                    textStyle={{color: "black"}}
                    pressedStyle={{
                        transform:[
                            {
                                rotate:"45deg"
                            }
                        ]
                    }}
                />
            </CView>
        </CView>
    );
};

export default DrawerHeader;

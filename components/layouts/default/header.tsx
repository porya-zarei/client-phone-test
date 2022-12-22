import {FC, ReactNode} from "react";
import {View} from "react-native";
import CView from "../../core/view";

interface DefaultHeaderLayoutProps {}

const DefaultHeaderLayout: FC<DefaultHeaderLayoutProps> = () => {
    return (
        <CView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}></CView>
    );
};

export default DefaultHeaderLayout;

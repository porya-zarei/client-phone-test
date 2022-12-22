import {FC, ReactNode} from "react";
import CView from "../../core/view";

interface DefaultFooterLayoutProps {}

const DefaultFooterLayout: FC<DefaultFooterLayoutProps> = () => {
    return (
        <CView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}></CView>
    );
};

export default DefaultFooterLayout;

import {FC, ReactNode} from "react";
import CView from "../../core/view";
import DefaultFooterLayout from "./footer";
import DefaultHeaderLayout from "./header";
import DefaultMainLayout from "./main";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
    return (
        <CView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <DefaultHeaderLayout />
            <DefaultMainLayout>{children}</DefaultMainLayout>
            <DefaultFooterLayout />
        </CView>
    );
};

export default DefaultLayout;

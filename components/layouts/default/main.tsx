import {FC, ReactNode} from "react";
import CView from "../../core/view";

interface DefaultMainLayoutProps {
    children: ReactNode;
}

const DefaultMainLayout: FC<DefaultMainLayoutProps> = ({children}) => {
    return (
        <CView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            {children}
        </CView>
    );
};

export default DefaultMainLayout;

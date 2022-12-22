import {FC} from "react";
import {View} from "react-native";

interface CViewProps {}

const CView: FC<CViewProps & View["props"]> = ({children, ...props}) => {
    return <View {...props}>{children}</View>;
};

export default CView;

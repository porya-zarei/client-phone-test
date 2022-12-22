import {FC} from "react";
import {StyleSheet, Text} from "react-native";
import {useAppTheme} from "../../../theme";

interface CTextProps {}

const styles = StyleSheet.create({
    text: {
        fontFamily: "mono",
    },
});

const CText: FC<CTextProps & Text["props"]> = ({children, style, ...props}) => {
    const {colors} = useAppTheme();
    return (
        <Text
            style={{...(style as object), ...{color: colors.text}, ...styles}}
            {...props}>
            {children}
        </Text>
    );
};

export default CText;

import {FC, ReactNode} from "react";
import {
    StyleSheet,
    Pressable,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import CText from "../text";

interface CButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title?: string;
    btnStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    pressedStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    icon?: ReactNode;
}

const CButton: FC<CButtonProps> = ({
    onPress,
    btnStyle,
    textStyle,
    pressedStyle,
    title,
    disabled = false,
    icon,
}) => {
    return (
        <Pressable
            style={({pressed}) => ({
                ...styles.button,
                ...(btnStyle as object),
                ...(pressed && (pressedStyle as object)),
            })}
            disabled={disabled}
            onPress={onPress}>
            {icon && icon}
            {title && title?.length > 0 && (
                <CText style={{...styles.text, ...(textStyle as object)}}>
                    {title}
                </CText>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        // elevation: 3,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
});

export default CButton;

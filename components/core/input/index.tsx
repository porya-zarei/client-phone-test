import {FC} from "react";
import {
    NativeSyntheticEvent,
    StyleProp,
    TextInputFocusEventData,
    TextStyle,
    ViewStyle,
} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import CView from "../view";

interface CInputProps {
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    onChangeText?: (text: string) => void;
    text: string;
    placeHolderTextColor?: string;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const CInput: FC<CInputProps> = ({
    containerStyle,
    inputStyle,
    placeholder = "",
    onChangeText,
    text,
    placeHolderTextColor,
    onBlur,
    onFocus,
}) => {
    return (
        <CView
            style={{
                ...{
                    padding: 5,
                    borderColor: "gray",
                    borderRadius: 5,
                    borderWidth: 2,
                },
                ...(containerStyle as object),
            }}>
            <TextInput
                onChangeText={onChangeText}
                value={text}
                placeholder={placeholder}
                style={{
                    ...{
                        height: "100%",
                        width: "100%",
                        borderColor: "transparent",
                    },
                    ...(inputStyle as object),
                }}
                placeholderTextColor={placeHolderTextColor}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        </CView>
    );
};

export default CInput;

import {FC, useState} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {useAppTheme} from "../../../theme";
import CButton from "../../core/button";
import CInput from "../../core/input";
import CText from "../../core/text";
import CView from "../../core/view";

interface RegisterProps {
    togglePage?: () => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    formContainer: {
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    },
    formTitle: {
        flex: 1,
        width: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 22,
        borderStyle: "solid",
        padding: 4,
        borderBottomWidth: 2,
    },
    formInputContainer: {
        width: "100%",
        padding: 10,
    },
    input: {
        height: 50,
    },
    formBtnsContainer: {
        flex: 4,
        width: "100%",
        padding: 10,
    },
    registerBtn: {
        width: "100%",
        padding: 15,
        margin: 2,
    },
    registerBtnPressed: {},
    registerBtnText:{},
    loginBtn: {
        width: "100%",
        padding: 15,
        margin: 2,
        borderWidth: 3,
    },
    loginBtnPressed: {},
    loginBtnText: {},
});

const Register: FC<RegisterProps> = ({togglePage}) => {
    const {colors, dark} = useAppTheme();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <CView style={styles.imageContainer}>
                <Image
                    source={require("../../../assets/images/register.png")}
                    style={{height: "100%", width: "100%", resizeMode: "cover"}}
                />
            </CView>
            <CView style={styles.formContainer}>
                <CView style={styles.formTitle}>
                    <CText
                        style={{
                            ...styles.title,
                            borderBottomColor: colors.dark,
                            color: colors.text,
                        }}>
                        ?????? ???????? ????????????
                    </CText>
                </CView>
                <CView style={styles.formInputContainer}>
                    <CInput
                        text={firstName}
                        onChangeText={setFirstName}
                        placeholder="??????"
                        containerStyle={{
                            ...styles.input,
                            borderColor: colors.grayLight,
                        }}
                        inputStyle={{
                            color: colors.text,
                            direction: "rtl",
                            textAlign: "right",
                        }}
                        placeHolderTextColor={colors.text}
                    />
                </CView>
                <CView style={styles.formInputContainer}>
                    <CInput
                        text={lastName}
                        onChangeText={setLastName}
                        placeholder="?????? ????????????????"
                        containerStyle={{
                            ...styles.input,
                            borderColor: colors.grayLight,
                        }}
                        inputStyle={{
                            color: colors.text,
                            direction: "rtl",
                            textAlign: "right",
                        }}
                        placeHolderTextColor={colors.text}
                    />
                </CView>
                <CView style={styles.formInputContainer}>
                    <CInput
                        text={email}
                        onChangeText={setEmail}
                        placeholder="??????????"
                        containerStyle={{
                            ...styles.input,
                            borderColor: colors.grayLight,
                        }}
                        inputStyle={{
                            color: colors.text,
                            direction: "rtl",
                            textAlign: "right",
                        }}
                        placeHolderTextColor={colors.text}
                    />
                </CView>
                <CView style={styles.formInputContainer}>
                    <CInput
                        text={password}
                        onChangeText={setPassword}
                        placeholder="?????? ????????"
                        containerStyle={{
                            ...styles.input,
                            borderColor: colors.grayLight,
                        }}
                        inputStyle={{
                            color: colors.text,
                            direction: "rtl",
                            textAlign: "right",
                        }}
                        placeHolderTextColor={colors.text}
                    />
                </CView>
                <CView style={styles.formInputContainer}>
                    <CInput
                        text={birthDate}
                        onChangeText={setBirthDate}
                        placeholder="?????????? ????????"
                        containerStyle={{
                            ...styles.input,
                            borderColor: colors.grayLight,
                        }}
                        inputStyle={{
                            color: colors.text,
                            direction: "rtl",
                            textAlign: "right",
                        }}
                        placeHolderTextColor={colors.text}
                    />
                </CView>
                <CView style={styles.formBtnsContainer}>
                    <CButton
                        title="?????? ??????"
                        btnStyle={{
                            ...styles.registerBtn,
                            backgroundColor: colors.primary,
                        }}
                        pressedStyle={styles.registerBtnPressed}
                        textStyle={{
                            ...styles.loginBtnText,
                            color: dark ? colors.dark : colors.light,
                        }}
                        onPress={() => {}}
                    />
                    <CButton
                        title="????????"
                        btnStyle={{
                            ...styles.loginBtn,
                            backgroundColor: colors.light,
                            borderColor: colors.primary,
                        }}
                        pressedStyle={styles.loginBtnPressed}
                        textStyle={{
                            ...styles.loginBtnText,
                            color: colors.primary,
                        }}
                        onPress={() => togglePage?.()}
                    />
                </CView>
            </CView>
        </CView>
    );
};

export default Register;

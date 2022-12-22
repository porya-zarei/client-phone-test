import {useTheme} from "@react-navigation/native";
import {FC, useState} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {useAppTheme} from "../../../theme";
import CButton from "../../core/button";
import CInput from "../../core/input";
import CText from "../../core/text";
import CView from "../../core/view";

interface LoginProps {
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
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 0,
    },
    formContainer: {
        flex: 3,
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
    loginBtn: {
        width: "100%",
        padding: 15,
        margin: 2,
    },
    loginBtnPressed: {},
    loginBtnText: {},
    registerBtn: {
        width: "100%",
        padding: 15,
        margin: 2,
        borderWidth: 3,
    },
    registerBtnPressed: {},
    registerBtnText: {},
});

const Login: FC<LoginProps> = ({togglePage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {colors, dark} = useAppTheme();

    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <CView style={styles.imageContainer}>
                <Image
                    source={require("../../../assets/images/login.png")}
                    style={{height: "100%", width: "100%", resizeMode: "cover"}}
                />
            </CView>
            <CView style={styles.formContainer}>
                <CView style={styles.formTitle}>
                    <CText
                        style={{
                            ...styles.title,
                            color: colors.dark,
                            borderBottomColor: colors.dark,
                        }}>
                        ورود به حساب کاربری
                    </CText>
                </CView>
                <CView style={styles.formInputContainer}>
                    <CInput
                        text={email}
                        onChangeText={setEmail}
                        placeholder="ایمیل"
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
                        placeholder="رمز عبور"
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
                        title="ورود"
                        btnStyle={{
                            ...styles.loginBtn,
                            backgroundColor: colors.primary,
                        }}
                        pressedStyle={styles.loginBtnPressed}
                        textStyle={{
                            ...styles.loginBtnText,
                            color: !dark ? colors.light : colors.dark,
                        }}
                        onPress={() => {}}
                    />
                    <CButton
                        title="ثبت نام"
                        btnStyle={{
                            ...styles.registerBtn,
                            backgroundColor: colors.light,
                            borderColor: colors.primary,
                        }}
                        pressedStyle={styles.registerBtnPressed}
                        textStyle={{
                            ...styles.registerBtnText,
                            color: colors.primary,
                        }}
                        onPress={() => togglePage?.()}
                    />
                </CView>
            </CView>
        </CView>
    );
};

export default Login;

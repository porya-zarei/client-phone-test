import {FC} from "react";
import {Image, StyleSheet} from "react-native";
import {useUserContext} from "../../../contexts/user-context";
import {useAppTheme} from "../../../theme";
import {IUser} from "../../../types/data";
import CButton from "../../core/button";
import CText from "../../core/text";
import CView from "../../core/view";

interface LogoutProps {
    handleLogout: () => void;
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
    formBtnsContainer: {
        flex: 4,
        width: "100%",
        padding: 10,
    },
    logoutBtn: {
        width: "100%",
        padding: 15,
        margin: 2,
    },
    logoutBtnPressed: {},
    logoutBtnText: {},
});

const Logout: FC<LogoutProps> = ({handleLogout}) => {
    const {colors, dark} = useAppTheme();
    const {changeUser} = useUserContext();
    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <CView style={styles.imageContainer}>
                <Image
                    source={require("../../../assets/images/logout.png")}
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
                        خروج از حساب کاربری
                    </CText>
                </CView>
                <CView style={styles.formBtnsContainer}>
                    <CButton
                        title="خروج از حساب"
                        btnStyle={{
                            ...styles.logoutBtn,
                            backgroundColor: colors.primary,
                        }}
                        pressedStyle={styles.logoutBtnPressed}
                        textStyle={{
                            ...styles.logoutBtnText,
                            color: dark ? colors.dark : colors.light,
                        }}
                        onPress={() => {
                            changeUser({} as IUser);
                            console.log("log out");
                            handleLogout();
                        }}
                    />
                </CView>
            </CView>
        </CView>
    );
};

export default Logout;

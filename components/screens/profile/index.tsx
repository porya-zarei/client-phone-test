import {FC, useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {useUserContext} from "../../../contexts/user-context";
import {useAppTheme} from "../../../theme";
import { IUser } from "../../../types/data";
import CButton from "../../core/button";
import CInput from "../../core/input";
import CText from "../../core/text";
import CView from "../../core/view";

interface ProfileScreenProps {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    header: {
        height: 100,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 10,
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    main: {
        width: "100%",
        minHeight: 100,
        padding: 10,
    },
    userInfoContainer: {
        width: "100%",
        padding: 10,
        margin: 10,
    },
    userInfoTitle: {},
    formInputContainer: {
        width: "100%",
        padding: 10,
        height: 70,
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    inputLabel: {
        height: "100%",
        width: "20%",
    },
    input: {
        height: "100%",
        width: "50%",
    },
    inputSubmit: {
        height: "100%",
        width: "15%",
        padding: 5,
    },
    inputSubmitText: {
        fontSize: 14,
    },
    footer: {height: 60, width: "100%", padding: 10},
});

const ProfileScreen: FC<ProfileScreenProps> = () => {
    const {colors, dark} = useAppTheme();
    const {user} = useUserContext();
    const [updatedUser,setUpdatedUser] = useState<IUser>({} as IUser);

    const handleChange = (key:string) => (text:string) => {
        setUpdatedUser(p => ({...p,[key]:text}));
    }

    useEffect(() => {
        setUpdatedUser(user);
    },[]);

    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <CView
                style={{
                    ...styles.header,
                    backgroundColor: dark ? colors.grayDark : colors.grayLight,
                }}>
                <CView style={styles.titleContainer}>
                    <CText style={{...styles.title, color: colors.text}}>
                        اطلاعات کاربری
                    </CText>
                </CView>
            </CView>
            <CView style={styles.main}>
                <CView style={styles.formInputContainer}>
                    <CText style={{color: colors.text}}>ای دی :</CText>
                    <CInput
                        text={updatedUser.id}
                        onChangeText={handleChange("id")}
                        placeholder=""
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
                    <CText style={{color: colors.text}}>نام :</CText>
                    <CInput
                        text={updatedUser.firstName}
                        onChangeText={handleChange("firstName")}
                        placeholder=""
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
                    <CText style={{color: colors.text}}>نام خانوادگی :</CText>
                    <CInput
                        text={updatedUser.lastName}
                        onChangeText={handleChange("lastName")}
                        placeholder=""
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
                    <CText style={{color: colors.text}}>ایمیل :</CText>
                    <CInput
                        text={updatedUser.email}
                        onChangeText={handleChange("email")}
                        placeholder=""
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
            </CView>
            <CView style={styles.footer}>
                <CText></CText>
            </CView>
        </CView>
    );
};

export default ProfileScreen;

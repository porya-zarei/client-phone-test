import {FC, useState, useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useSocketContext} from "../../../contexts/socket-context";
import {useAppTheme} from "../../../theme";
import CButton from "../../core/button";
import CInput from "../../core/input";

interface SettingMainProps {}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "flex-start", alignItems: "center"},
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
});

const SettingMain: FC<SettingMainProps> = () => {
    const {colors, dark} = useAppTheme();
    const {ip, changeIp, port, changePort} = useSocketContext();
    const [newIp, setNewIp] = useState("");
    const [newPort, setNewPort] = useState("");

    useEffect(() => {
        setNewIp(ip);
        setNewPort(String(port));
        return () => {};
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.formInputContainer}>
                <Text style={{color: colors.text}}>آی پی اتصال :</Text>
                <CInput
                    text={newIp}
                    onChangeText={setNewIp}
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
                <CButton
                    title="ذخیره"
                    onPress={() => {
                        changeIp(newIp);
                    }}
                    btnStyle={{
                        ...styles.inputSubmit,
                        backgroundColor: colors.secondary,
                    }}
                    textStyle={{...styles.inputSubmitText}}
                />
            </View>
            <View style={styles.formInputContainer}>
                <Text style={{color: colors.text}}>آی پی اتصال :</Text>
                <CInput
                    text={newPort}
                    onChangeText={(text) => {
                        if (!isNaN(Number(text))) {
                            setNewPort(text);
                        }
                    }}
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
                <CButton
                    title="ذخیره"
                    onPress={() => {
                        changePort(Number(newPort));
                    }}
                    btnStyle={{
                        ...styles.inputSubmit,
                        backgroundColor: colors.secondary,
                    }}
                    textStyle={{...styles.inputSubmitText}}
                />
            </View>
        </View>
    );
};

export default SettingMain;

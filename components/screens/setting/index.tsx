import {FC} from "react";
import {Image, StyleSheet} from "react-native";
import {useAppTheme} from "../../../theme";
import CText from "../../core/text";
import CView from "../../core/view";
import SettingMain from "./setting-main";

interface SettingScreenProps {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    header: {
        height: "15%",
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
        height: "45%",
        width: "100%",
        minHeight: 100,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },
    footer: {
        height: "40%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

const SettingScreen: FC<SettingScreenProps> = () => {
    const {colors, dark} = useAppTheme();
    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <CView
                style={{
                    ...styles.header,
                    backgroundColor: dark ? colors.grayDark : colors.grayLight,
                }}>
                <CView style={styles.titleContainer}>
                    <CText style={{...styles.title, color: colors.text}}>
                        تنظیمات
                    </CText>
                </CView>
            </CView>
            <CView style={styles.main}>
                <SettingMain />
            </CView>
            <CView style={styles.footer}>
                <CView
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical:20,
                        paddingHorizontal:0,
                    }}>
                    <Image
                        style={{height: "100%", width: "90%",resizeMode:"contain"}}
                        source={require("../../../assets/images/preference.png")}
                    />
                </CView>
            </CView>
        </CView>
    );
};

export default SettingScreen;

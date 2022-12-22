import {FC} from "react";
import {StyleSheet} from "react-native";
import {useAppTheme} from "../../../theme";
import CText from "../../core/text";
import CView from "../../core/view";

interface HelpScreenProps {}

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
    footer: {height: 60, width: "100%", padding: 10},
});

const HelpScreen: FC<HelpScreenProps> = () => {
    const {colors, dark} = useAppTheme();
    return (
        <CView style={{...styles.container, backgroundColor: colors.light}}>
            <CView
                style={{
                    ...styles.header,
                    backgroundColor: dark ? colors.grayDark : colors.grayLight,
                }}>
                <CView style={styles.titleContainer}>
                    <CText style={{...styles.title}}>
                        مشکلات متداول کاربران
                    </CText>
                </CView>
            </CView>
            <CView style={styles.main}></CView>
            <CView style={styles.footer}>
                <CText>footer</CText>
            </CView>
        </CView>
    );
};

export default HelpScreen;

import {FC} from "react";
import {StyleSheet, Image, ScrollView, Linking} from "react-native";
import {useAppTheme} from "../../../theme";
import CButton from "../../core/button";
import CText from "../../core/text";
import CView from "../../core/view";

interface ContactUsScreenProps {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "flex-start",
        // alignItems: "center",
        overflow: "scroll",
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
        padding: 0,
    },
    imageContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: 250,
        padding: 0,
    },
    footer: {height: 60, width: "100%", padding: 10},
});

const ContactUsScreen: FC<ContactUsScreenProps> = () => {
    const {colors, dark} = useAppTheme();
    return (
        <ScrollView
            style={{...styles.container, backgroundColor: colors.light}}>
            <CView
                style={{
                    ...styles.header,
                    backgroundColor: dark ? colors.grayDark : colors.grayLight,
                }}>
                <CView style={styles.titleContainer}>
                    <CText style={{...styles.title}}>ارتباط با ما</CText>
                </CView>
            </CView>
            <CView style={styles.main}>
                <CView style={styles.imageContainer}>
                    <Image
                        source={require("../../../assets/images/contact-us.png")}
                        style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "cover",
                        }}
                    />
                </CView>
                <CView style={{padding: 15}}>
                    <CText style={{fontSize: 20, textAlign: "center"}}>
                        برای ارتباط با ما می توانید به سایت
                    </CText>
                    <CButton
                        title="امیدفضا"
                        onPress={() => {
                            Linking.openURL("https://www.spaceomid.com/");
                        }}
                        btnStyle={{backgroundColor: "transparent"}}
                        textStyle={{color: colors.text}}
                    />
                    <CText style={{fontSize: 20, textAlign: "center"}}>
                        مراجعه کنید
                    </CText>
                    <CView
                        style={{
                            borderTopWidth: 2,
                            marginTop: 15,
                            paddingTop: 15,
                        }}>
                        <CButton
                            title="شماره تماس : ۶۶۹۲۷۱۳۳-۰۲۱"
                            onPress={() => {
                                Linking.openURL("tel://02166927133");
                            }}
                            btnStyle={{
                                backgroundColor: "transparent",
                                padding: 10,
                                margin: 5,
                                borderWidth: 2,
                                borderColor: dark
                                    ? colors.grayLight
                                    : colors.grayDark,
                            }}
                            textStyle={{color: colors.text}}
                        />
                        <CButton
                            title="شماره فکس : ۶۶۹۳۷۰۶۹-۰۲۱"
                            onPress={() => {
                                // Linking.openURL("call://www.spaceomid.com/");
                            }}
                            btnStyle={{
                                backgroundColor: "transparent",
                                padding: 10,
                                margin: 5,
                                borderWidth: 2,
                                borderColor: dark
                                    ? colors.grayLight
                                    : colors.grayDark,
                            }}
                            textStyle={{color: colors.text}}
                        />
                        <CButton
                            title="ایمیل : info@spaceomid.com"
                            onPress={() => {
                                Linking.openURL("mailto:info@spaceomid.com");
                            }}
                            btnStyle={{
                                backgroundColor: "transparent",
                                padding: 10,
                                margin: 5,
                                borderWidth: 2,
                                borderColor: dark
                                    ? colors.grayLight
                                    : colors.grayDark,
                            }}
                            textStyle={{color: colors.text}}
                        />
                    </CView>
                </CView>
            </CView>
            <CView style={styles.footer}>
                <CText></CText>
            </CView>
        </ScrollView>
    );
};

export default ContactUsScreen;

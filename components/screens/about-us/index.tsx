import {FC} from "react";
import {StyleSheet, Image, ScrollView} from "react-native";
import {useAppTheme} from "../../../theme";
import CText from "../../core/text";
import CView from "../../core/view";

interface AboutUsScreenProps {}

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

const AboutUsScreen: FC<AboutUsScreenProps> = () => {
    const {colors, dark} = useAppTheme();
    return (
        <ScrollView style={{...styles.container, backgroundColor: colors.light}}>
            <CView
                style={{
                    ...styles.header,
                    backgroundColor: dark ? colors.grayDark : colors.grayLight,
                }}>
                <CView style={styles.titleContainer}>
                    <CText style={{...styles.title}}>درباره ما</CText>
                </CView>
            </CView>
            <CView style={styles.main}>
                <CView style={styles.imageContainer}>
                    <Image
                        source={require("../../../assets/images/about-us.png")}
                        style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "cover",
                        }}
                    />
                </CView>
                <CView style={{padding: 15}}>
                    <CText style={{fontSize: 20, textAlign: "center"}}>
                        امید‌فضا اولین شرکت خصوصی در طراحی و ساخت ماهواره‌های
                        سنجشی و مخابراتی، طراح و مجری منظومه ماهواره‌های‌
                        سه‌نما، شتاب‌دهنده طرح‌های سخت‎‌‌ افزاری و نرم افزاری در
                        فناوری‌ها و کاربردهای فضاپایه و فضاگرا‌ می‌باشد.
                    </CText>
                    <CText
                        style={{
                            fontSize: 20,
                            borderTopWidth: 2,
                            marginTop: 15,
                            paddingTop: 15,
                        }}>
                        شرکت امید فضا در تاریخ ۱۳۹۷/۰۸/۳۰ توسط دکتر حسین شهرابی
                        فراهانی (رئیس سابق گروه فضایی صاایران، مدیر پروژه
                        ماهواره ملی امید و چندین ماهواره پرتاب شده دیگر) و جمعی
                        از دانشجویان دانشگاه امیرکبیر تاسیس گردید. این شرکت با
                        محور قرار دا دن طراحی و ساخت ماهواره‌های سبک و ارزان
                        برای توسعه منظومه ماهوارهای در مدار کم ارتفاع زمین
                        فعالیت خود را جهت طراحی و ساخت ماهواره “کوثر” شروع کرد.
                        یکی از اولویت‌های امیدفضا تربیت نسلی زبده برای صنعت
                        فضایی کشور است لذا شتابدهی تیم‌های فنی نیز در دستور کار
                        قرار گرفت تا در کنار افراد با تجربه در حوزه فضا نقش
                        آفرینی کنند. همزمان شتابدهی تیم‌ها با موضوع کاربری‌های
                        هوشمندسازی فضاگرا جهت به کاربری رساندن منظومه ماهوارهای
                        نیز در دستور کار قرار گرفته است.
                    </CText>
                </CView>
            </CView>
            <CView style={styles.footer}>
                <CText></CText>
            </CView>
        </ScrollView>
    );
};

export default AboutUsScreen;

import {FC} from "react";
import {Octicons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

import AboutUsScreen from "../components/screens/about-us";
import AuthScreen from "../components/screens/auth";
import ContactUsScreen from "../components/screens/contact-us";
import HelpScreen from "../components/screens/help";
import HomeScreen from "../components/screens/home";
import ProfileScreen from "../components/screens/profile";
import SettingScreen from "../components/screens/setting";
import {IAppTheme} from "../theme";
import {IUser} from "../types/data";

export interface IAppRoute {
    icon: (
        colors: IAppTheme["colors"],
    ) => (props: {
        color: string;
        size: number;
        focused: boolean;
    }) => React.ReactNode;
    path: string;
    name: string;
    component: FC<any>;
    renderCheck?: (user: IUser | null | undefined) => boolean;
}

const ICON_SIZE = 24;

export const APP_ROUTES: IAppRoute[] = [
    {
        path: "home",
        name: "خانه",
        component: HomeScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <Octicons
                        name="home"
                        color={focused ? colors.primary : colors.text}
                        size={ICON_SIZE}
                    />
                ),
    },
    {
        path: "auth",
        name: "ورود | خروج",
        component: AuthScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <MaterialCommunityIcons
                        name="login"
                        size={ICON_SIZE}
                        color={focused ? colors.primary : colors.text}
                    />
                ),
    },
    {
        path: "profile",
        name: "پروفایل",
        component: ProfileScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={ICON_SIZE}
                        color={focused ? colors.primary : colors.text}
                    />
                ),
        renderCheck: (user) => {
            if (user && user?.id?.length > 0) return true;
            return false;
        },
    },
    {
        path: "help",
        name: "کمک",
        component: HelpScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <Ionicons
                        name="help-circle-outline"
                        size={ICON_SIZE}
                        color={focused ? colors.primary : colors.text}
                    />
                ),
    },
    {
        path: "about us",
        name: "درباره ما",
        component: AboutUsScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <Ionicons
                        name="information-circle-outline"
                        size={ICON_SIZE}
                        color={focused ? colors.primary : colors.text}
                    />
                ),
    },
    {
        path: "contact us",
        name: "ارتباط با ما",
        component: ContactUsScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <MaterialCommunityIcons
                        name="phone-dial-outline"
                        size={ICON_SIZE}
                        color={focused ? colors.primary : colors.text}
                    />
                ),
    },
    {
        path: "setting",
        name: "تنظیمات",
        component: SettingScreen,
        icon:
            (colors) =>
            ({focused}) =>
                (
                    <Ionicons
                        name="settings-outline"
                        size={ICON_SIZE}
                        color={focused ? colors.primary : colors.text}
                    />
                ),
    },
];

export const APP_ROUTES_PATH = APP_ROUTES.map((r) => r.name);

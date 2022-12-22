import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {FC} from "react";
import Screens from ".";
import {EThemeMode, useViewContext} from "../../contexts/view-context";
import {AppDarkTheme, AppLightTheme} from "../../theme";
import Notifications from "../core/notifications";
import CView from "../core/view";

interface NavigationProviderProps {}

const NavigationProvider: FC<NavigationProviderProps> = () => {
    const {themeMode} = useViewContext();
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer
                theme={
                    themeMode === EThemeMode.DARK ? AppDarkTheme : AppLightTheme
                }>
                <Screens />
                <Notifications />
            </NavigationContainer>
        </>
    );
};

export default NavigationProvider;

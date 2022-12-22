import {DefaultTheme, Theme, useTheme} from "@react-navigation/native";

export interface IAppTheme {
    dark: boolean;
    colors: Theme["colors"] & {
        primary: string;
        primaryLight: string;
        primaryDark: string;
        secondary: string;
        secondarLight: string;
        secondaryDark: string;
        gray: string;
        grayLight: string;
        grayDark: string;
        light: string;
        dark: string;
        info: string;
        danger: string;
        warning: string;
        black: string;
        white: string;
    };
}

export const AppLightTheme: IAppTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: "#00afb9",
        primaryLight: "#7FD6CB",
        primaryDark: "#0081a7",
        secondary: "#ffc300",
        secondarLight: "#ffd60a",
        secondaryDark: "#ffa2aa",
        gray: "#403d39",
        grayLight: "#dee2e6",
        grayDark: "#6c757d",
        light: "#eeeeee",
        white: "#ffffff",
        dark: "#353535",
        black: "#222222",
        info: "#0a9396",
        danger: "#d62828",
        warning: "#faa307",
        text: "#353535",
    },
};

export const AppDarkTheme: IAppTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: "#00afb9",
        primaryLight: "#7FD6CB",
        primaryDark: "#0081a7",
        secondary: "#ffc300",
        secondarLight: "#ffd60a",
        secondaryDark: "#ffa2aa",
        gray: "#403d39",
        grayLight: "#dee2e6",
        grayDark: "#6c757d",
        light: "#353535",
        white: "#222222",
        dark: "#eeeeee",
        black: "#ffffff",
        info: "#0a9396",
        danger: "#d62828",
        warning: "#faa307",
        text: "#eeeeee",
    },
};

export const useAppTheme = () => {
    const theme = useTheme() as IAppTheme;
    return theme;
};

export const lighten = (color: string) => {
    return `${color}99`;
};

export const darken = (color: string) => {
    return `${color}22`;
};

export const alphalyze = (color: string, alpha: number) => {
    const numIn256 = (alpha / 100) * 256;
    return `${color}${numIn256.toString(16)}`;
};

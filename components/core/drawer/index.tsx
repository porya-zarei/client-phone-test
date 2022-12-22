import {createDrawerNavigator} from "@react-navigation/drawer";
import {FC} from "react";
import AuthScreen from "../../screens/auth";
import HomeScreen from "../../screens/home";
import DrawerContent from "./content";
import {getHeaderTitle} from "@react-navigation/elements";
import DrawerHeader from "./header";
import {useAppTheme} from "../../../theme";
import SettingScreen from "../../screens/setting";
import {Octicons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useUserContext} from "../../../contexts/user-context";
import HelpScreen from "../../screens/help";
import AboutUsScreen from "../../screens/about-us";
import ContactUsScreen from "../../screens/contact-us";
import {APP_ROUTES} from "../../../routes";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";

interface DrawerProps {}

const ICON_SIZE = 20;

const DrawerNavigator = createDrawerNavigator();
const Drawer: FC<DrawerProps> = (props) => {
    const {colors} = useAppTheme();
    const {user} = useUserContext();
    return (
        <DrawerNavigator.Navigator
            initialRouteName="home"
            screenOptions={{
                drawerPosition: "right",
                header: ({layout, navigation, options, route}) => {
                    const title = getHeaderTitle(options, route.name);
                    return (
                        <DrawerHeader
                            title={title}
                            style={
                                options.headerStyle as Omit<
                                    typeof options.headerStyle,
                                    "Value"
                                >
                            }
                            navigation={navigation}
                        />
                    );
                },
                // drawerIcon:({color,focused,size}) => (<Icon color={color} size={size} name={focused ? "heart" : "heart-outline"} />)
            }}
            drawerContent={(props) => <DrawerContent {...props} />}>
            <DrawerNavigator.Group>
                {APP_ROUTES.map((route) =>
                    route?.renderCheck ? (
                        route.renderCheck?.(user) && (
                            <DrawerNavigator.Screen
                                key={route.path}
                                name={route.path}
                                options={{
                                    drawerIcon: route.icon(colors),
                                    title: route.name,
                                }}
                                component={route.component}
                            />
                        )
                    ) : (
                        <DrawerNavigator.Screen
                            name={route.path}
                            key={route.path}
                            options={{
                                drawerIcon: route.icon(colors),
                                title: route.name,
                            }}
                            component={route.component}
                        />
                    ),
                )}
            </DrawerNavigator.Group>
        </DrawerNavigator.Navigator>
    );
};

export default Drawer;

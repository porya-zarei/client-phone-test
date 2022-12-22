import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppTheme} from "../../theme";
import Drawer from "../core/drawer";
import ChatScreen from "./chat";

const Stack = createNativeStackNavigator();

const Screens = () => {
    const {colors} = useAppTheme();
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={({route}) => ({
                headerShown: route.name.includes("modal"),
                headerTitleStyle: {
                    color: colors.text,
                },
                headerStyle: {
                    backgroundColor: colors.white,
                },
            })}>
            <Stack.Group>
                <Stack.Screen name="اصلی" component={Drawer} />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: "modal"}}>
                <Stack.Screen
                    name="chat-modal"
                    options={{title: "برگشت"}}
                    component={ChatScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default Screens;

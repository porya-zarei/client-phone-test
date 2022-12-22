import UserContextProvider from "./contexts/user-context";
import ViewContextProvider from "./contexts/view-context";
import NavigationProvider from "./components/screens/navigation-provider";
import AppContextProvider from "./contexts/app-context";
import SocketContextProvider from "./contexts/socket-context";
import ChatsContextProvider from "./contexts/chats-context";
import NotificationsContextProvider from "./contexts/notifications-context";
// import {useFont} from "expo-font";

export default function App() {
    // useFont({
    //
    // });

    return (
        <AppContextProvider>
            <NotificationsContextProvider>
                <UserContextProvider>
                    <ChatsContextProvider>
                        <SocketContextProvider>
                            <ViewContextProvider>
                                <NavigationProvider />
                            </ViewContextProvider>
                        </SocketContextProvider>
                    </ChatsContextProvider>
                </UserContextProvider>
            </NotificationsContextProvider>
        </AppContextProvider>
    );
}

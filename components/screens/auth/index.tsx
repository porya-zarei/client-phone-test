import {useNavigation} from "@react-navigation/native";
import {FC, useState, useEffect} from "react";
import {Text, View} from "react-native";
import {useChatsContext} from "../../../contexts/chats-context";
import {useUserContext} from "../../../contexts/user-context";
import CButton from "../../core/button";
import CInput from "../../core/input";
import CView from "../../core/view";
import Login from "./login";
import Logout from "./logout";
import Register from "./register";

enum EPage {
    LOGIN,
    REGISTER,
    LOGOUT,
}

interface AuthScreenProps {}

const AuthScreen: FC<AuthScreenProps> = () => {
    const {isUserLogedIn, user} = useUserContext();
    const {changeChats, changeMessages, changeSelectedChat} = useChatsContext();
    const [page, setPage] = useState(EPage.LOGIN);
    const togglePage = () =>
        setPage((p) => (p === EPage.LOGIN ? EPage.REGISTER : EPage.LOGIN));
    const handleLogout = () => {
        changeChats([]);
        changeMessages([]);
        changeSelectedChat(null);
        setPage(EPage.LOGIN);
    };

    useEffect(() => {
        isUserLogedIn() && setPage(EPage.LOGOUT);
        return () => {};
    }, [user]);

    return (
        <CView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}>
            <CView
                style={{
                    flex: 11,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}>
                {page === EPage.LOGIN ? (
                    <Login togglePage={togglePage} />
                ) : page === EPage.REGISTER ? (
                    <Register togglePage={togglePage} />
                ) : (
                    <Logout handleLogout={handleLogout} />
                )}
            </CView>
        </CView>
    );
};

export default AuthScreen;

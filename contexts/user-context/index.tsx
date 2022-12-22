import {
    FC,
    createContext,
    useMemo,
    useContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import {EGender, IUser} from "../../types/data";

interface UserContextProviderProps {
    children: ReactNode;
}

interface IUserContext {
    user: IUser;
    changeUser: Dispatch<SetStateAction<IUser>>;
    isUserLogedIn: () => boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {
    const [user, setUser] = useState<IUser>({
        id: "1234",
        charge: 500000,
        createDate: new Date(),
        email: "pzeinstein@gmail.com",
        firstName: "porya",
        lastName: "zarei",
        package: {
            checkDate: new Date(),
            numberOfDays: 30,
        },
        password: "12345678",
        gender:EGender.MAN
    });
    const changeUser: Dispatch<SetStateAction<IUser>> = (value) => {
        setUser(value);
    };
    const isUserLogedIn = () => {
        return user && user?.id?.length > 0;
    };
    const context = useMemo(
        () => ({
            user,
            changeUser,
            isUserLogedIn,
        }),
        [user],
    );

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("invalid scope");
    return context;
};

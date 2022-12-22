import {
    FC,
    createContext,
    useMemo,
    useContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import {storageGet, storageSet} from "../../storage";
import {IChat, IMessage, IUser} from "../../types/data";

interface ChatsContextProviderProps {
    children: ReactNode;
}

interface IChatsContext {
    chats: IChat[];
    changeChats: Dispatch<SetStateAction<IChat[]>>;
    filteredChats: IChat[];
    changeFilteredChats: Dispatch<SetStateAction<IChat[]>>;
    selectedChat: IChat | null;
    changeSelectedChat: Dispatch<SetStateAction<IChat | null>>;
    messages: IMessage[];
    changeMessages: Dispatch<SetStateAction<IMessage[]>>;
    users: IUser[];
    changeUsers: Dispatch<SetStateAction<IUser[]>>;
}

const ChatsContext = createContext<IChatsContext>({} as IChatsContext);

const ChatsContextProvider: FC<ChatsContextProviderProps> = ({children}) => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [filteredChats, setFilteredChats] = useState<IChat[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
    const [users, setUsers] = useState<IUser[]>([]);
    const changeChats: Dispatch<SetStateAction<IChat[]>> = (value) => {
        let newChats = chats;
        if (typeof value === "function") newChats = value(chats);
        else newChats = value;
        storageSet("chats", newChats);
        setChats(value);
    };
    const changeFilteredChats: Dispatch<SetStateAction<IChat[]>> = (value) => {
        setFilteredChats(value);
    };
    const changeSelectedChat: Dispatch<SetStateAction<IChat | null>> = (
        value,
    ) => {
        setSelectedChat(value);
    };
    const changeMessages: Dispatch<SetStateAction<IMessage[]>> = (value) => {
        let newMessages = messages;
        if (typeof value === "function") newMessages = value(messages);
        else newMessages = value;
        storageSet("messages", newMessages);
        console.log("new messages => ", newMessages);
        setMessages(value);
    };
    const changeUsers: Dispatch<SetStateAction<IUser[]>> = (value) => {
        let newUsers = users;
        if (typeof value === "function") newUsers = value(users);
        else newUsers = value;
        storageSet("users", newUsers);
        console.log("new users => ", newUsers);
        setUsers(value);
    };
    const context = useMemo(
        () => ({
            chats,
            selectedChat,
            messages,
            filteredChats,
            users,
            changeChats,
            changeSelectedChat,
            changeMessages,
            changeFilteredChats,
            changeUsers,
        }),
        [chats, selectedChat, messages, filteredChats, users],
    );

    useEffect(() => {
        (async () => {
            const storedChats = await storageGet<IChat[]>("chats", false);
            storedChats && setChats(storedChats);
            storedChats && setFilteredChats(storedChats);
            const storedMessages = await storageGet<IMessage[]>(
                "messages",
                false,
            );
            storedMessages && setMessages(storedMessages);
            const storedUsers = await storageGet<IUser[]>("users", false);
            storedUsers && setUsers(storedUsers);
        })();
        return () => {};
    }, []);

    return (
        <ChatsContext.Provider value={context}>
            {children}
        </ChatsContext.Provider>
    );
};

export default ChatsContextProvider;

export const useChatsContext = () => {
    const context = useContext(ChatsContext);
    if (!context) throw new Error("invalid scope");
    return context;
};

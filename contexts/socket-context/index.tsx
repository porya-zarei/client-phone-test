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
import {EMessageStatus, IMessage} from "../../types/data";
import {messageToRawText, rawTextToMessages} from "../../utils/messages-helper";
import {useChatsContext} from "../chats-context";
import {useUserContext} from "../user-context";

interface SocketContextProviderProps {
    children: ReactNode;
}

interface ISocketContext {
    isSocketConnected: boolean;
    changeIsSocketConnected: Dispatch<SetStateAction<boolean>>;
    checkConnectionToDevice: () => Promise<boolean>;
    checkConnectionToServer: () => Promise<boolean>;
    sendMessage: (message: IMessage) => Promise<boolean>;
    checkNewMessages: (chatId: string) => Promise<void>;
    sendMessagesToServer: () => Promise<void>;
    ip: string;
    changeIp: Dispatch<SetStateAction<string>>;
    port: number;
    changePort: Dispatch<SetStateAction<number>>;
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext);

const DEFAULT_IP = "192.168.4.1"; // 172.18.224.137
const DEFAULT_PORT = 80;

const SocketContextProvider: FC<SocketContextProviderProps> = ({children}) => {
    // const [socketClient, setSocketClient] = useState<ITcpClient>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [ip, setIp] = useState(DEFAULT_IP);
    const [port, setPort] = useState(DEFAULT_PORT);

    const {changeMessages, messages} = useChatsContext();
    const {user} = useUserContext();

    const changeIp: Dispatch<SetStateAction<string>> = (value) => {
        setIp(value);
        let newIp = ip;
        if (typeof value === "function") newIp = value(ip);
        else newIp = value;
        storageSet("ip", newIp).then((res) => {
            console.log("result in change ip => ", res, newIp);
        });
    };
    const changePort: Dispatch<SetStateAction<number>> = (value) => {
        setPort(value);
        let newPort = port;
        if (typeof value === "function") newPort = value(port);
        else newPort = value;
        storageSet("port", newPort).then((res) => {
            console.log("result in change port => ", res, newPort);
        });
    };

    const sendToDevice = async (
        method: "GET" | "POST" | "PUT" | "DELETE",
        url: string,
        text: string = "",
    ): Promise<[string, boolean]> => {
        const full_url = `http://${ip}:${port}/${url}`;
        const response = await fetch(full_url, {
            method,
            body: method === "GET" ? undefined : text,
        });
        const result = (await response?.text()) ?? "";
        // console.log("resp => ",response);
        console.log("request result => ", result);
        return [result, response.ok];
    };
    `$SenderId=3213&Id=1&Text=\n+IPD,0,52:12345678912345678912345678912345678912345678912345\n&Lat=0.000000&Lon=0.000000$`;
    const checkConnectionToDevice = async () => {
        try {
            const [text, ok] = await sendToDevice(
                "GET",
                `get-gps?userId=${user.id}`,
            );
            const isOk = ok && new RegExp("[0-9]{0,10},[0-9]{0,10}").test(text);
            setIsSocketConnected(isOk);
            console.log("check device connection => ", text);
            return isOk;
        } catch (error) {
            console.log("check connection to device error => ", error);
            return false;
        }
    };

    const checkConnectionToServer = async () => {
        try {
            const [text, ok] = await sendToDevice("GET", "server-request");
            console.log("check server connection => ", text);
            return ok;
        } catch (error) {
            console.log("check connection to server error => ", error);
            return false;
        }
    };

    const checkNewMessages = async (chatId: string) => {
        try {
            const [text, ok] = await sendToDevice(
                "GET",
                `new-messages?userId=${user.id}&chatId=${chatId}`,
            );
            setIsSocketConnected(ok);
            if (text.length > 10) {
                const msgs = rawTextToMessages(text).filter(
                    (msg) => messages.findIndex((m) => msg.id === m.id) < 0,
                );
                console.log("messages => ", msgs);
                changeMessages((p) => [...p, ...msgs]);
            }
        } catch (error) {
            console.log("check connection to device error => ", error);
        }
    };

    const sendMessagesToServer = async () => {
        try {
            const [text, ok] = await sendToDevice(
                "GET",
                `send-messages-to-server?userId=${user.id}`,
            );
            setIsSocketConnected(ok);
            console.log("result => ", text);
        } catch (error) {
            console.log("check connection to device error => ", error);
        }
    };

    const sendMessage = async (message: IMessage) => {
        try {
            const rawText = messageToRawText(message);
            changeMessages((p) => [...p, message]);
            const [text, ok] = await sendToDevice(
                "POST",
                `send-message?userId=${user.id}&chatId=${message.chatId}`,
                rawText,
            );
            console.log("send message response => ", text);
            if (ok) {
                changeMessages((p) => {
                    const msgs = [...p];
                    const index = msgs.findIndex((m) => m.id === message.id);
                    if (index >= 0) {
                        msgs[index].status = EMessageStatus.SENDED;
                    }
                    return msgs;
                });
            }
            return ok;
        } catch (error) {
            console.log("error in send message => ", error);
            return false;
        }
    };

    const changeIsSocketConnected: Dispatch<SetStateAction<boolean>> = (
        value,
    ) => {
        setIsSocketConnected(value);
    };

    const context = useMemo(
        () => ({
            isSocketConnected,
            changeIsSocketConnected,
            checkConnectionToDevice,
            checkConnectionToServer,
            sendMessage,
            checkNewMessages,
            ip,
            changeIp,
            port,
            changePort,
            sendMessagesToServer,
        }),
        [isSocketConnected, ip, port],
    );

    useEffect(() => {
        (async () => {
            let ipToSet = DEFAULT_IP;
            let portToSet = DEFAULT_PORT;

            const storedIp = await storageGet<string>("ip", true);
            storedIp && storedIp?.length > 0 && (ipToSet = storedIp);

            const storedPort = await storageGet<string>("port", true);
            storedPort &&
                storedPort?.length > 0 &&
                (portToSet = Number(storedPort));

            setIp(ipToSet);
            setPort(portToSet);

            console.log("data readed from async storage !!");
            await checkConnectionToDevice();
        })();

        return () => {};
    }, []);

    return (
        <SocketContext.Provider value={context}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("invalid scope");
    return context;
};

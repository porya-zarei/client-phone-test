import {
    FC,
    createContext,
    useState,
    useMemo,
    useEffect,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
import {INotification} from "../../types/view";
import {uuidGenerator} from "../../utils/id-generator";

interface NotificationsContextProviderProps {
    children: ReactNode;
}

interface INotificationsContext {
    notifications: INotification[];
    notify: (notification: Omit<INotification, "id">) => void;
    unNotify: (id?: string) => void;
}

const NotificationsContext = createContext<INotificationsContext>(
    {} as INotificationsContext,
);

const DEFAULT_NOTIFICATION: Partial<INotification> = {
    autoClose: true,
    draggable: false,
    duration: 500,
    type: "info",
};

const NotificationsContextProvider: FC<NotificationsContextProviderProps> = ({
    children,
}) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const notify = (notification: Omit<INotification, "id">) => {
        const id = uuidGenerator();
        setNotifications((p) => [
            ...p,
            {...DEFAULT_NOTIFICATION, ...notification, id},
        ]);
        if (!!notification.autoClose) {
            setTimeout(() => {
                unNotify(id);
            }, notification.duration);
        }
    };
    const unNotify = (id?: string) => {
        if (id) {
            setNotifications((p) => [...p.filter((n) => n.id !== id)]);
        } else {
            setNotifications([]);
        }
    };
    const context = useMemo(
        () => ({
            notifications,
            notify,
            unNotify,
        }),
        [notifications],
    );

    // useEffect(() => {}, []);

    return (
        <NotificationsContext.Provider value={context}>
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContextProvider;

export const useNotificationsContext = () => {
    const context = useContext(NotificationsContext);
    if (!context) throw new Error("invalid scope");
    return context;
};

import {FC} from "react";
import {StyleSheet} from "react-native";
import {useNotificationsContext} from "../../../contexts/notifications-context";
import CView from "../view";
import Notification from "./notification";

interface NotificationsProps {}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 100,
        width: "100%",
        // zIndex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});

const Notifications: FC<NotificationsProps> = () => {
    const {notifications} = useNotificationsContext();
    return notifications?.length > 0 ? (
        <CView style={{...styles.container}}>
            {notifications.map((n) => (
                <Notification key={n.id} notification={n} />
            ))}
        </CView>
    ) : (
        <></>
    );
};

export default Notifications;

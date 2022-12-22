import {FC} from "react";
import {Ionicons} from "@expo/vector-icons";
import {EMessageStatus} from "../../../types/data";

interface CheckMarkProps {
    status: EMessageStatus;
    size: number;
    color: string;
}

const CheckMark: FC<CheckMarkProps> = ({status, color, size}) => {
    if (status === EMessageStatus.PENDING)
        return <Ionicons name="time-outline" size={size} color={color} />;
    else if (status === EMessageStatus.NOT_SENDED)
        return <Ionicons name="refresh-outline" size={size} color={color} />;
    else if (status === EMessageStatus.SENDED)
        return <Ionicons name="send-outline" size={size} color={color} />;
    else if (status === EMessageStatus.SEEN)
        return <Ionicons name="checkmark-done" size={size} color={color} />;
    else return <Ionicons name="checkmark" size={size} color={color} />;
};

export default CheckMark;

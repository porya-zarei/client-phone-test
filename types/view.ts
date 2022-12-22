import {ReactNode} from "react";

export interface INotification {
    id: string;
    content: ReactNode;
    icon?: ReactNode;
    draggable?: boolean;
    duration?: number;
    autoClose?: boolean;
    type?:
        | "dark"
        | "light"
        | "danger"
        | "info"
        | "warning"
        | "primary"
        | "secondary";
}

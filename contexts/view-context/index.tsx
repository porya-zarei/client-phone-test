import {
    FC,
    createContext,
    useState,
    useMemo,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

interface ViewContextProviderProps {
    children: ReactNode;
}

export enum EThemeMode {
    DARK,
    LIGHT,
}

interface IViewContext {
    themeMode: EThemeMode;
    changeThemeMode: Dispatch<SetStateAction<EThemeMode>>;
}

const ViewContext = createContext<IViewContext>({} as IViewContext);

const ViewContextProvider: FC<ViewContextProviderProps> = ({children}) => {
    const [themeMode, setThemeMode] = useState<EThemeMode>(EThemeMode.DARK);
    const changeThemeMode: Dispatch<SetStateAction<EThemeMode>> = (value) => {
        setThemeMode(value);
    };
    const context = useMemo(
        () => ({
            themeMode,
            changeThemeMode,
        }),
        [themeMode],
    );

    return (
        <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
    );
};

export default ViewContextProvider;

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (!context) throw new Error("invalid scope");
    return context;
};

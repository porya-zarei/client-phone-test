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

interface AppContextProviderProps {
    children: ReactNode;
}

interface IAppContext {}

const AppContext = createContext<IAppContext>({} as IAppContext);

const AppContextProvider: FC<AppContextProviderProps> = ({children}) => {
    const context = useMemo(() => ({}), []);

    useEffect(() => {}, []);

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
};

export default AppContextProvider;

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("invalid scope");
    return context;
};

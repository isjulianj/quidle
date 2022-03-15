import React, {ReactNode} from "react";
import {ICache} from "../../lib/services/ICache";


export const CacheContext = React.createContext<ICache | null>(null);

interface CacheProviderProps {
    meetingsCacheProvider: ICache
    children?: ReactNode
}

export const CacheProvider = ({meetingsCacheProvider, children }: CacheProviderProps) => {
    return (
        <CacheContext.Provider value={meetingsCacheProvider}>
            {children}
            </CacheContext.Provider>
    );
};

export const useCache = () => {
    return React.useContext(CacheContext);
};

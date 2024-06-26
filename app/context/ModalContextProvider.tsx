import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType>({
    loading: false,
    setLoading: () => {},
});

export const useModalContext = () => useContext(ModalContext);

const ModalProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState(false);
    return (
        <ModalContext.Provider value={{ loading, setLoading }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const Context = createContext<boolean | null>(null);

export const NetworkDetector: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onlineHandler = () => {
      setIsOnline(true);
    };

    const offlineHandler = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  return <Context.Provider value={isOnline}>{children}</Context.Provider>;
};

export default NetworkDetector;

export const useNetworkDetector = () => {
  const network = useContext(Context);

  return network;
};

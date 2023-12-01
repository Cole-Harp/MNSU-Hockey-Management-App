"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";

type PusherContextType = {
  pusher: Pusher | null;
  isConnected: boolean;
};

const PusherContext = createContext<PusherContextType>({
  pusher: null,
  isConnected: false,
});

export const usePusher = () => {
  return useContext(PusherContext);
};

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pusherInstance = new Pusher('1de64c593121ed63d268', {
      cluster: 'us2'
    });

    pusherInstance.connection.bind('connected', () => {
      setIsConnected(true);
    });

    pusherInstance.connection.bind('disconnected', () => {
      setIsConnected(false);
    });

    setPusher(pusherInstance);

    return () => {
      pusherInstance.disconnect();
    }
  }, []);

  return (
    <PusherContext.Provider value={{ pusher, isConnected }}>
      {children}
    </PusherContext.Provider>
  )
}

"use client";

/* 
  This is for node socket server local to the app
  Can be used to see connection status
  Pusher is more robust and can be used for production
*/

import { useSocket } from "./socker-provider";
import { Badge } from "@/Components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge 
        variant="outline" 
        className="bg-yellow-600 text-white border-none"
      >
        Fallback: Polling every 1s
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-emerald-600 text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  )
}
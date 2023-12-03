import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { serverURL } from "./CommonBackend";
import { useAppStore } from "../state";

type CallbackCleanupFunction = () => void;
const dummyCleanupFunction: CallbackCleanupFunction = () => {
  return;
};

type FriendStatusListener = () => void;

type UpdateHandlerContextType = {
  onFriendsStatusUpdate: (
    listener: FriendStatusListener
  ) => CallbackCleanupFunction;
};

const UpdateHandlerContext = createContext<UpdateHandlerContextType>({
  onFriendsStatusUpdate: () => {
    return dummyCleanupFunction;
  },
});

function UpdateHandlerProvider({ children }: { children: ReactNode }) {
  const token = useAppStore((store) => store.token);

  const friendStatusListeners = useRef<FriendStatusListener[]>([]);

  const [ws, setWs] = useState<null | WebSocket>(null);

  useEffect(() => {
    if (!token) {
      ws?.close?.();
      setWs(null);
      return;
    }
    if (ws) {
      return;
    }

    console.log("Trying to reopen update handler...");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newWs = new WebSocket(`ws://${serverURL}/updates/`, null, {
      headers: { Authorization: "Token " + token },
    });

    newWs.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "friend_status_update") {
          for (const listener of friendStatusListeners.current) {
            listener();
          }
        } else {
          console.error("Unknown update: ", payload);
        }
      } catch (error) {
        console.error("Update handler error: ", error);
      }
    };

    newWs.onclose = () => {
      setTimeout(() => setWs(null), 1000);
    };

    setWs(newWs);
  }, [token, ws]);

  // Cleanup on unmount
  useEffect(() => {
    ws?.close?.();
  }, []);

  const onFriendsStatusUpdate = useCallback(
    (listener: FriendStatusListener) => {
      friendStatusListeners.current.push(listener);

      // Return cleanup function
      return () => {
        friendStatusListeners.current = friendStatusListeners.current.filter(
          (l) => l === listener
        );
      };
    },
    []
  );

  return (
    <UpdateHandlerContext.Provider value={{ onFriendsStatusUpdate }}>
      {children}
    </UpdateHandlerContext.Provider>
  );
}

export { UpdateHandlerProvider, UpdateHandlerContext };

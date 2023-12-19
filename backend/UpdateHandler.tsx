import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { serverURL } from "./CommonBackend";
import { useAppStore } from "../state";
import { GameInvite } from "../components/GameInvitations";

type CallbackCleanupFunction = () => void;
const dummyCleanupFunction: CallbackCleanupFunction = () => {
  return;
};

type FriendStatusListener = () => void;
type WaitRoomInvitationListener = (invites: GameInvite[]) => void;

type UpdateHandlerContextType = {
  onFriendsStatusUpdate: (
    listener: FriendStatusListener
  ) => CallbackCleanupFunction;
  onWaitRoomInvitation: (
    listener: WaitRoomInvitationListener
  ) => CallbackCleanupFunction;
};

const UpdateHandlerContext = createContext<UpdateHandlerContextType>({
  onFriendsStatusUpdate: () => {
    return dummyCleanupFunction;
  },
  onWaitRoomInvitation: () => {
    return dummyCleanupFunction;
  },
});

function UpdateHandlerProvider({ children }: { children: ReactNode }) {
  const token = useAppStore((store) => store.token);

  const friendStatusListeners = useRef<FriendStatusListener[]>([]);
  const waitRoomInvitationListeners = useRef<WaitRoomInvitationListener[]>([]);

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
        } else if (payload.type === "waitroom_invitation") {
          if (payload.invitations[0]) {
            for (const listener of waitRoomInvitationListeners.current) {
              listener(
                payload.invitations.map(
                  (invite: {
                    username: string;
                    game: string;
                    waitroom: number;
                    wordset_id: number;
                  }) => {
                    return {
                      username: invite.username,
                      game: invite.game,
                      waitRoom: invite.waitroom,
                      wordSetId: invite.wordset_id,
                    };
                  }
                )
              );
            }
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
  const onWaitRoomInvitation = useCallback(
    (listener: WaitRoomInvitationListener) => {
      waitRoomInvitationListeners.current.push(listener);

      // Return cleanup function
      return () => {
        waitRoomInvitationListeners.current =
          waitRoomInvitationListeners.current.filter((l) => l === listener);
      };
    },
    []
  );

  return (
    <UpdateHandlerContext.Provider
      value={{ onFriendsStatusUpdate, onWaitRoomInvitation }}
    >
      {children}
    </UpdateHandlerContext.Provider>
  );
}

export { UpdateHandlerProvider, UpdateHandlerContext };

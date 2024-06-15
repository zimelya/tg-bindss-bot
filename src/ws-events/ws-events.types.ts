export interface Message {
  sender: string;
  body: string;
}

export interface ClientToServerListen {
  message: (message: Message) => void;
}
export interface ServerToClientListen {
  message: (message: Message) => void;
}

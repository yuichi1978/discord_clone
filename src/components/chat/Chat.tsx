import React, { memo, FC, useState, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "./Chat.scss";
import useSubCollection from "../../hooks/useSubCollection";

interface Messages {
  Timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

export const Chat: FC = memo(() => {
  const [inputText, setInputText] = useState<string>("");
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);
  const { subDocuments: messages } = useSubCollection("channels", "messages");

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // channelsコレクションの中にあるmessageコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
      message: inputText,
      Timestamp: serverTimestamp(),
      user: user
    });
    // console.log(docRef);
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.message} timestamp={message.Timestamp} user={message.user} />
        ))}
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder="#Udemyへメッセージを送信" value={inputText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} />
          <button type="submit" className="chatInputbutton" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
            送信
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
});
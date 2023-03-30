import { FC, memo, useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";

import { SidebarChannel } from "./SidebarChannel";
import { useCollection } from "../../hooks/useCollection";
import "./Sidebar.scss";
import { addDoc, collection } from "firebase/firestore";
// import { collection, query } from "firebase/firestore/lite";

export const Sidebar: FC = memo(() => {
  const user = useAppSelector((state) => state.user.user);
  const { documents: channels } = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null = prompt("新しいチャンネルを作成します");

    if(channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  }

  return (
    <div className="sidebar">
      {/* sidebarLeft */}
      <div className="sidebarleft">
        <div className="serverIcon">
          <img src="./public/discordIcon.png" alt="" />
        </div>
      </div>
      {/* sidebarRight */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>

        {/* sidebarChannels */}
        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon />
              <h4>プログラミングチャンネル</h4>
            </div>
            <AddIcon className="sidebarAddIcon" onClick={() => addChannel()} />
          </div>

          <div className="sidebarChannelsList">
            {channels.map((channel) => (
              <SidebarChannel channel={channel} id={channel.id} key={channel.id} />
            ))}
          </div>
        </div>

        <div className="sidebarFooter">
          <div className="sidebarAccount">
            <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
            <div className="accountName">
              <h4>{user?.displayName}</h4>
              <span>#{user?.uid.substring(0, 4)}</span>
            </div>
          </div>

          <div className="sidebarVoice">
            <MicIcon />
            <HeadphonesIcon className="honesIcon" />
            <SettingsIcon />
          </div>
        </div>

      </div>
    </div>
  );
});
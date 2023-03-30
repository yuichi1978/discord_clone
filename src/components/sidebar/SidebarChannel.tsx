import { memo, FC } from "react";
// import { useSelector } from "react-redux";
import { DocumentData } from "firebase/firestore";

import "./SidebarChannel.scss";
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";

type Props = {
  id: string;
  channel: DocumentData;
};

export const SidebarChannel: FC<Props> = memo((props) => {
  const { id, channel } = props;
  const dispatch = useAppDispatch();
  // const {  } = useSelector();

  return (
    <div className="sidebarChannel" onClick={() => 
      dispatch( 
        setChannelInfo({
          channelId: id,
          channelName: channel.channel.channelName,
      }))}>
      <h4>
        <span className="sidebarChannelHash">#</span>
          {channel.channel.channelName}
      </h4>
    </div>
  );
});
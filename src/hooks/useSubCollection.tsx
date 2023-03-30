import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";

interface Messages {
  message: string;
  Timestamp: Timestamp;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName, String(channelId), subCollectionName);

    const collectionRefOrderBy = query(collectionRef, orderBy("Timestamp", "desc"));

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          Timestamp: doc.data().Timestamp,
          message: doc.data().message,
          user: doc.data().user,
        })
      });
      setSubDocuments(results);
    });
  }, [channelId]);

  return { subDocuments };
};

export default useSubCollection;
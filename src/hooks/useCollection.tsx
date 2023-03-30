import { useState, useEffect } from "react";
import { onSnapshot, collection, query, DocumentData, Query } from "firebase/firestore";
import { db } from "../firebase";

interface Channels {
  id: string;
  channel: DocumentData;
}

export const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) =>
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        }));
      setDocuments(channelsResults);
    });
  }, []);

  return { documents };
};
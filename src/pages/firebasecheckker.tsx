import { db } from "@/firebase/init";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const FirebaseCheck = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testCollection")); 
        setData(`Firebase connected! Found ${querySnapshot.size} documents.`);
      } catch (err) {
        setError(`Error connecting to Firebase: ${err}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>Firebase Connection Test</h2>
      {data ? <p>{data}</p> : <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FirebaseCheck;

import { useCallback, useEffect, useState } from 'react';
import { useRampCTFGetFlag } from './hooks';

function App() {
  const [flag, setFlag] = useState("");

  const getFlagState = useRampCTFGetFlag();


  const handleSetFlagWithTypewriterEffect = useCallback((flag: string) => {
    flag.split("").forEach((_, index) => {
      setTimeout(() => {
        setFlag(flag.substring(0, index+1));
      }, index * 175);
    });
  }, []);

  useEffect(() => {
    if (getFlagState.value) {
      handleSetFlagWithTypewriterEffect(getFlagState.value);
    }
  }, [getFlagState.value, handleSetFlagWithTypewriterEffect]);



  return (
    <div style={{ backgroundColor: "lightgray", position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {getFlagState.loading ? <p>Loading...</p> : <p>{flag}</p>}
    </div>
  );
}

export default App;

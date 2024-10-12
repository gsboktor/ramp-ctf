import { useCallback, useEffect, useState } from 'react';
import { useRampCTFGetFlag } from './hooks';

function App() {
  const [flag, setFlag] = useState<string[]>();

  const getFlagState = useRampCTFGetFlag();


  const handleSetFlagWithTypewriterEffect = useCallback((flag: string) => {
    flag.split("").forEach((_, index) => {
      setTimeout(() => {
        setFlag(prev => [...(prev ?? []), flag[index]]);
      }, index * 500);
    });
  }, []);

  useEffect(() => {
    if (getFlagState.value) {
      handleSetFlagWithTypewriterEffect(getFlagState.value);
    }
  }, [getFlagState.value, handleSetFlagWithTypewriterEffect]);



  return (
    <div style={{ backgroundColor: "lightgray", position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {getFlagState.loading ? (<p>Loading...</p>) :
        (<div style={{ display: "flex", flexDirection: "row" }}>
          {flag?.map((char, index) => (
            <p key={index}>{char}</p>
          ))}
        </div>)
      }
    </div>
  );
}

export default App;

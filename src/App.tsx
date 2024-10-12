import { useCallback, useEffect, useState } from 'react';
import { useRampCTFGetFlag } from './hooks';

function App() {
  const [flag, setFlag] = useState<string[]>();
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  const {value: getFlagStateValue, loading: getFlagStateLoading} = useRampCTFGetFlag();

  const handleSetFlagWithTypewriterEffect = useCallback((flag: string) => {
    const newTimeouts: NodeJS.Timeout[] = [];

    flag.split("").forEach((char, index) => {
      const timeout = setTimeout(() => {
        setFlag(prev => [...(prev ?? []), char]);
      }, (index + 1) * 500);

      newTimeouts.push(timeout);
    });

    setTimeouts(newTimeouts);
  }, []);

  useEffect(() => {
    if (getFlagStateValue) {
      handleSetFlagWithTypewriterEffect(getFlagStateValue);
    }
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [getFlagStateValue, handleSetFlagWithTypewriterEffect]);

  return (
    <div style={{ backgroundColor: "lightgray", position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {getFlagStateLoading ? (<p style={{fontSize: "2rem"}}>Loading...</p>) :
        (<div style={{ display: "flex", flexDirection: "row" }}>
          {flag?.map((char, index) => (
            <p key={index} style={{fontSize: "2rem"}}>{char}</p>
          ))}
        </div>)
      }
    </div>
  );
}

export default App;

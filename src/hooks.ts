import { useAsync } from "react-use";
import { rampCTFClient } from "./client";


export const useRampCTFGetFlag = () => {
    return useAsync(async () => {
        return rampCTFClient.getFlag();
    }, []);
}   
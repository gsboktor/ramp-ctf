import { useAsync } from "react-use";
import { createRampCTFClient } from "./client";

export const useRampCTFGetFlag = () => {
    return useAsync(async () => {
        const rampCTFClient = createRampCTFClient();
        return rampCTFClient.getFlag();
    }, []);
}   
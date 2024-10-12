export interface RampCTFClient {
    getFlag: () => Promise<string>;
}

export const createRampCTFClient = (): RampCTFClient => {

    const getFlag = async (): Promise<string> => {
        const response = await fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/756e63");
        const data = await response.text();
        return data;
    }

    return {
        getFlag: getFlag
    }
}

export const rampCTFClient = createRampCTFClient();
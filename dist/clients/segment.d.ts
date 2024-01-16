export declare class Segment implements IClient {
    static CLIENT_KEY: string;
    private config;
    constructor(config: Partial<IConfigSegment>);
    identifyUser(userId: string): Promise<void>;
    trackPageEvent(userId: string): Promise<void>;
    trackCopyEvent(userId: string, content: string): Promise<void>;
    trackCustomEvent(userId: string, event: string, properties: object): Promise<void>;
    private setAnonymousId;
    private getAnonymousId;
}

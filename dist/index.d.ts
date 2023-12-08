export default class {
    private config;
    private getUserId;
    private clients;
    constructor(config?: Partial<IConfig>);
    start(): this;
    setGetUserId(method: IGetUserId): this;
    registerSegment(config: Partial<IConfigSegment>): this;
    unregisterSegment(): void;
    optIn(): void;
    optOut(): void;
    identifyUser(): Promise<void>;
    trackPage(): Promise<void>;
    trackCopy(content: string): Promise<void>;
    private startPageListener;
    private startCopyListener;
}

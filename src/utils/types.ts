interface IConfig {
  optOut: boolean;
  debug: boolean;
  trackPages: boolean;
  trackCopies: boolean;
}

interface IConfigSegment {
  url: string;
}

interface IClient {
  identifyUser(userId: string): Promise<void>;
  trackPageEvent(userId: string): Promise<void>;
  trackCopyEvent(userId: string, content: string): Promise<void>;
}

type IGetUserId = () => Promise<string>;

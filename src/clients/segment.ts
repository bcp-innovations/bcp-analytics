import axios from "axios";
import {
  ANONYMOUS_USER_ID,
  SEGMENT_ANONYMOUS_USER_ID,
} from "../utils/constants";

export class Segment implements IClient {
  public static CLIENT_KEY = "SEGMENT";
  private config: IConfigSegment = {
    url: "",
  };

  constructor(config: Partial<IConfigSegment>) {
    this.config = { ...this.config, ...config };
  }

  async identifyUser(userId: string) {
    const payload = {
      user_id: userId,
      ajs_anonymous_id: this.getAnonymousId(),
    };

    const { data } = await axios.post(`${this.config.url}/identify`, payload, {
      withCredentials: true,
    });
    this.setAnonymousId(data[SEGMENT_ANONYMOUS_USER_ID]);
  }

  async trackPageEvent(userId: string) {
    const payload = {
      user_id: userId,
      path: window.location.href,
      referrer: document.referrer,
      ajs_anonymous_id: this.getAnonymousId(),
    };

    const { data } = await axios.post(`${this.config.url}/page`, payload, {
      withCredentials: true,
    });
    this.setAnonymousId(data[SEGMENT_ANONYMOUS_USER_ID]);
  }

  async trackCopyEvent(userId: string, content: string) {
    const payload = {
      user_id: userId,
      ajs_anonymous_id: this.getAnonymousId(),
      path: window.location.href,
      referrer: document.referrer,
      event: "COPY",
      properties: {
        content,
      },
    };

    const { data } = await axios.post(`${this.config.url}/track`, payload, {
      withCredentials: true,
    });
    this.setAnonymousId(data[SEGMENT_ANONYMOUS_USER_ID]);
  }

  private setAnonymousId(id: string) {
    localStorage.setItem(ANONYMOUS_USER_ID, id);
  }

  private getAnonymousId(): string {
    return localStorage.getItem(ANONYMOUS_USER_ID) || "";
  }
}

import { Segment } from "./clients/segment";

export default class {
  private config: IConfig = {
    optOut: false,
    debug: false,
    trackPages: true,
    trackCopies: true,
  };
  private getUserId: IGetUserId = async () => "";

  private clients: { [clientKey: string]: IClient } = {};

  constructor(config?: Partial<IConfig>) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error("must be installed in a browser");
    }

    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  public start() {
    if (this.config.optOut) {
      return this;
    }

    if (this.config.trackPages) {
      this.startPageListener();
    }

    if (this.config.trackPages) {
      this.startCopyListener();
    }

    return this;
  }

  public setGetUserId(method: IGetUserId) {
    this.getUserId = method;
    return this;
  }

  public registerSegment(config: Partial<IConfigSegment>) {
    this.clients[Segment.CLIENT_KEY] = new Segment(config);

    if (this.config.debug) {
      console.log("segment registered");
    }

    return this;
  }

  public unregisterSegment() {
    delete this.clients[Segment.CLIENT_KEY];

    if (this.config.debug) {
      console.log("segment unregistered");
    }
  }

  public optIn() {
    this.config.optOut = false;

    if (this.config.debug) {
      console.log("opt in");
    }
  }

  public optOut() {
    this.config.optOut = true;

    if (this.config.debug) {
      console.log("opt out");
    }
  }

  public async identifyUser() {
    if (this.config.optOut) {
      return;
    }

    try {
      const userId = await this.getUserId();

      Object.keys(this.clients).forEach(async (key: string) => {
        if (this.config.debug) {
          console.log(`identify user ${userId} in ${key}`);
        }

        try {
          await this.clients[key].identifyUser(userId);
        } catch (err) {
          console.error("failed to identify user in client", key, err);
        }
      });
    } catch (err) {
      console.error("failed to identify", err);
    }
  }

  public async trackPage() {
    if (this.config.optOut) {
      return;
    }

    try {
      const userId = await this.getUserId();

      Object.keys(this.clients).forEach(async (key: string) => {
        if (this.config.debug) {
          console.log(`track page with user ${userId} in ${key}`);
        }

        try {
          await this.clients[key].trackPageEvent(userId);
        } catch (err) {
          console.error("failed to track page in client", key, err);
        }
      });
    } catch (err) {
      console.error("failed to track page", err);
    }
  }

  public async trackCopy(content: string) {
    if (this.config.optOut) {
      return;
    }

    try {
      const userId = await this.getUserId();

      Object.keys(this.clients).forEach(async (key: string) => {
        if (this.config.debug) {
          console.log(
            `track copy with user ${userId} and content "${content}" in ${key}`
          );
        }

        try {
          await this.clients[key].trackCopyEvent(userId, content);
        } catch (err) {
          console.error("failed to track copy in client", key, err);
        }
      });
    } catch (err) {
      console.error("failed to track copy", err);
    }
  }

  public async trackCustom(event: string, properties: object) {
    if (this.config.optOut) {
      return;
    }

    try {
      const userId = await this.getUserId();

      Object.keys(this.clients).forEach(async (key: string) => {
        if (this.config.debug) {
          console.log(
            `track custom event with user ${userId} and event "${event}" in ${key}`
          );
        }

        try {
          await this.clients[key].trackCustomEvent(userId, event, properties);
        } catch (err) {
          console.error("failed to track custom event in client", key, err);
        }
      });
    } catch (err) {
      console.error("failed to track custom event", err);
    }
  }

  private startPageListener() {
    this.trackPage();

    const observeUrlChange = () => {
      let oldHref = document.location.href;
      const body = document.querySelector("body");
      const observer = new MutationObserver(() => {
        if (oldHref !== document.location.href) {
          oldHref = document.location.href;

          this.trackPage();
        }
      });

      if (body) {
        observer.observe(body, { childList: true, subtree: true });
      }
    };

    window.onload = observeUrlChange;

    if (this.config.debug) {
      console.log("page listener started");
    }
  }

  private startCopyListener() {
    document.addEventListener("copy", () => {
      const selection = document.getSelection();

      if (selection) {
        this.trackCopy(selection.toString());
      }
    });

    if (this.config.debug) {
      console.log("copy listener started");
    }
  }
}

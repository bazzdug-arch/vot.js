import Logger from "@vot.js/shared/utils/logger";
import { BaseHelper } from "./base";

type CloudSettings = {
  request?: {
    weblink?: string;
  };
  dispatcher?: {
    weblink_get?: {
      url?: string;
    };
  };
};

export default class CloudMailRuHelper extends BaseHelper {
  async getVideoId(url: URL): Promise<string | undefined> {
    const match = url.pathname.match(/^\/public\/(.+)/);
    return match?.[1];
  }

  async getVideoData(videoId: string) {
    try {
      const settings = (window as unknown as { cloudSettings?: CloudSettings })
        .cloudSettings;
      if (!settings?.dispatcher?.weblink_get?.url) {
        throw new Error("cloudSettings or weblink_get dispatcher not found");
      }

      const baseUrl = settings.dispatcher.weblink_get.url;
      const url = `${baseUrl}/${videoId}`;

      return {
        url,
        duration: undefined,
      };
    } catch (err) {
      Logger.error(
        `Failed to get cloud.mail.ru video data: ${(err as Error).message}`,
      );
      return undefined;
    }
  }
}

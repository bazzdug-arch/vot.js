import { BaseHelper } from "./base";

export default class DailymotionHelper extends BaseHelper {
  getVideoIdFromUrl(url: URL): string | undefined {
    if (url.hostname === "dai.ly") {
      return url.pathname.split("/").filter(Boolean)?.[0];
    }

    const videoIdFromQuery = url.searchParams.get("video");
    if (videoIdFromQuery) {
      return videoIdFromQuery;
    }

    return (
      /(?:^|\/)video\/([^/]+)/.exec(url.pathname)?.[1] ??
      /(?:^|\/)player\/([^/.]+)/.exec(url.pathname)?.[1]
    );
  }

  async getVideoId(url: URL): Promise<string | undefined> {
    const parsedVideoId = this.getVideoIdFromUrl(url);
    if (parsedVideoId) {
      return parsedVideoId;
    }
  }
}

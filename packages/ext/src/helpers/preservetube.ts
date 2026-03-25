import Logger from "@vot.js/shared/utils/logger";
import type { MinimalVideoData } from "../types/client";
import { BaseHelper, VideoHelperError } from "./base";

export default class PreserveTubeHelper extends BaseHelper {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getVideoData(videoId: string): Promise<MinimalVideoData | undefined> {
    try {
      if (!videoId) {
        throw new VideoHelperError("Failed to find PreserveTube video ID");
      }

      return {
        url: `https://s3.archive.party/preservetube/${videoId}.mp4`,
      };
    } catch (err) {
      Logger.error(
        `Failed to get PreserveTube data by videoId: ${videoId}`,
        (err as Error).message,
      );
      return undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getVideoId(url: URL) {
    return url.searchParams.get("v") ?? undefined;
  }
}

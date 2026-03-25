import type { MinimalVideoData } from "../types/client";
import { BaseHelper } from "./base";

export default class MediafileHelper extends BaseHelper {
  DEFAULT_SITE_ORIGIN = "https://mediafile.cc";
  SITE_ORIGIN = this.service?.url?.slice(0, -1) ?? this.DEFAULT_SITE_ORIGIN;

  private getVideoSrc() {
    const video =
      this.video instanceof HTMLVideoElement
        ? this.video
        : document.querySelector<HTMLVideoElement>("video");

    return (
      video?.src ||
      video?.currentSrc ||
      video?.querySelector<HTMLSourceElement>("source[src]")?.src ||
      undefined
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getVideoData(videoId: string): Promise<MinimalVideoData | undefined> {
    const videoSource = this.getVideoSrc();

    if (!videoSource) {
      return undefined;
    }

    const data: MinimalVideoData & {
      video_url: string;
    } = {
      url: `${this.SITE_ORIGIN}/${videoId}`,
      video_url: videoSource,
      translationHelp: [
        {
          target: "video_file_url",
          targetUrl: videoSource,
        },
      ],
    };

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getVideoId(url: URL) {
    return url.pathname.replace(/^\/+/, "") || undefined;
  }
}

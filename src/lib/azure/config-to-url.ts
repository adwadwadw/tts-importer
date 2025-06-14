import { z } from "zod";
import { ApiConfig, VoiceConfig } from "./types";

export const validVoiceConfigSchema = z.object({
  voice: z.string(),
  localName: z.string(),
  format: z.string(),
  pitch: z.string().nullish(),
  style: z.string().nullish(),
  customAgent: z.string().nullish(),
});
/**
 * Generate a URL for remote profile from api and voice config
 *
 * For Azure module, used in frontend.
 *
 * @param api - API config for Azure
 * @param voice - Voice config for Azure
 * @param origin - Origin of remote(generating) url
 * @param pathname - Pathname of remote(generating) url
 * @returns URL
 */
export function config2url(
  api: ApiConfig,
  voice: VoiceConfig,
  origin: string,
  pathname: string
): URL {
  const url = new URL(pathname, origin);
  url.searchParams.set("api", JSON.stringify(api));
  url.searchParams.set("voice", JSON.stringify(voice));
  return url;
}

/**
 * Parse a URL to get api and voice config
 *
 * For Azure module, used in backend.
 *
 * @param url - URL to parse
 * @returns API and voice config
 */
export function url2config(
  url: URL
):
  | { success: true; data: { api: ApiConfig; voice: VoiceConfig } }
  | { success: false } {
  const params = Object.fromEntries(url.searchParams.entries());
  const { api: apiStr, voice: voiceStr } = params;
  if (!apiStr || !voiceStr) {
    return { success: false };
  }
  let api;
  let voice;
  try {
    api = JSON.parse(apiStr);
    voice = JSON.parse(voiceStr);
  } catch {
    return { success: false };
  }
  const apiParsed = z
    .object({
      region: z.string(),
      key: z.string(),
    })
    .safeParse(api);
  const voiceParsed = validVoiceConfigSchema.safeParse(voice);

  if (!apiParsed.success || !voiceParsed.success) {
    return { success: false };
  } else {
    return {
      success: true,
      data: {
        api: apiParsed.data,
        voice: voiceParsed.data,
      },
    };
  }
}

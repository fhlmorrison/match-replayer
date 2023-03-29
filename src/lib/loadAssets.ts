import { appDataDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

export async function openVideo() {
  const file = (await open({
    defaultPath: "~/videos",
    multiple: false,
    filters: [
      {
        name: "Video",
        extensions: ["mp4"],
      },
    ],
  })) as string;
  return file ? convertFileSrc(file) : "";
}

export async function loadVideo(relativePath: string) {
  const appDataDirPath = await appDataDir();
  const filePath = await join(appDataDirPath, relativePath);
  const assetUrl = convertFileSrc(filePath);
  return assetUrl;
}

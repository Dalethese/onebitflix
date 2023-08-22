import { Response } from "express";
import { IWatchTime } from "../models/WatchTime";
import { WatchTime } from "../models";
import path from "path";
import fs from "fs";

export const episodeService = {
  streamEpisodeToResponse: (
    res: Response,
    videoUrl: string,
    range: string | undefined
  ) => {
    // 1º pegar o caminho do arquivo
    const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl);
    const fileStat = fs.statSync(filePath);

    // quando se faz um streaming ele carrega partes do video e não o video completo pra isso serve o range

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;

      const chunkSize = end - start + 1;

      const file = fs.createReadStream(filePath, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head); // 206 é o código que indica que é algo parcial

      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileStat.size,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);

      fs.createReadStream(filePath).pipe(res);
    }
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      where: { userId, episodeId },
      attributes: ["seconds"],
    });

    return watchTime;
  },

  setWatchTime: async ({ userId, episodeId, seconds }: IWatchTime) => {
    const watchTime = await WatchTime.findOne({
      where: { userId, episodeId },
    });

    if (watchTime) {
      watchTime.seconds = seconds;
      await watchTime.save();

      return watchTime;
    } else {
      const newWatchTime = await WatchTime.create({ userId, episodeId, seconds });

      return newWatchTime;
    }
  },
};

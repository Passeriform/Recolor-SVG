import { get } from "https";
import { NowRequest, NowResponse } from "@vercel/node"
import { customizeSvg } from "../lib/svg"

const urlToBuffer = (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const data: Uint8Array[] = [];
    get(url, (res) => {
      res
        .on("data", (chunk: Uint8Array) => {
          data.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(data));
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  });
}

export default async (req: NowRequest, res: NowResponse) => {
	const { svgUrl, color, size } = req.query

	const svgBuffer = await urlToBuffer(svgUrl)
	const file = Buffer.from(
		customizeSvg(svgBuffer, { color, size })
	)

	res.setHeader("Content-Type", "image/svg+xml");
	return res.send(file);
}

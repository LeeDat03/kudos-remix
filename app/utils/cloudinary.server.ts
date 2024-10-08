import { writeAsyncIterableToWritable } from "@remix-run/node";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

async function uploadImage(data: AsyncIterable<Uint8Array>) {
	const uploadPromise = new Promise((resolve, reject) => {
		const uploadStream = cloudinary.v2.uploader.upload_stream(
			{
				folder: "remix",
			},
			(error, result) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(result);
			}
		);
		writeAsyncIterableToWritable(data, uploadStream).catch(reject);
	});

	return uploadPromise;
}

export { uploadImage };

import {
	unstable_parseMultipartFormData,
	unstable_createMemoryUploadHandler,
	ActionFunction,
	json,
} from "@remix-run/node";

import { requireUserId } from "~/utils/auth.server";
import { uploadImage } from "~/utils/cloudinary.server";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
	const userId = await requireUserId(request);

	const formData = await unstable_parseMultipartFormData(
		request,
		unstable_createMemoryUploadHandler()
	);

	// Get the uploaded file from the form data
	const file = formData.get("file") as File | null;

	if (!file) {
		return json({ error: "No file uploaded" }, { status: 400 });
	}

	// Convert the file to an async iterable Uint8Array
	const fileData = file.stream() as unknown as AsyncIterable<Uint8Array>;

	// Upload the image and get the secure URL
	const uploadResult: any = await uploadImage(fileData);
	const imageUrl = uploadResult.secure_url;

	// Update the user's profile picture
	await prisma.user.update({
		data: {
			profile: {
				update: {
					profilePicture: imageUrl,
				},
			},
		},
		where: {
			id: userId,
		},
	});

	// Return the URL of the uploaded image
	return json({ imageUrl });
};

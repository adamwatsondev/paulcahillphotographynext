import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  if (!folder) {
    return new Response(JSON.stringify({ error: "Folder name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await cloudinary.search
      .expression(`folder=${folder}`)
      .execute();

    return new Response(
      JSON.stringify({ resources: response.resources || [] }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to fetch resources from Cloudinary:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch resources" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

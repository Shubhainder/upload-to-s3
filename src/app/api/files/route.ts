// app/api/files/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: `${userId}/`
    });

    const response = await s3Client.send(command);
    const files = response.Contents?.map(obj => ({
      name: obj.Key?.split('/').pop(), // Get filename without user ID prefix
      lastModified: obj.LastModified,
      size: obj.Size
    })) || [];

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' }, 
      { status: 500 }
    );
  }
}
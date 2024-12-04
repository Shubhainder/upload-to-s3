// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ 
  region: process.env.AWS_S3_REGION 
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  console.log(userId,'---');
  
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  console.time('sts')
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // console.log(formData,'---------0',file,'------------');
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${userId}/${file.name}`,
      Body: buffer,
      ContentType: file.type
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    console.timeEnd('sts');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
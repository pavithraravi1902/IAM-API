import { S3Client, CreateBucketCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Configure the AWS SDK to use LocalStack
const s3Client = new S3Client({
  endpoint: 'http://localhost:4566',
  region: 'eu-west-1',
  credentials: {
    accessKeyId: 'awsUserAuthentication',
    secretAccessKey: 'awsUserAuthenticationKey'
  },
  forcePathStyle: true,
});

const bucketName = 'userauthentication';

const createBucket = async () => {
  try {
    const createBucketCommand = new CreateBucketCommand({ Bucket: bucketName });
    const data = await s3Client.send(createBucketCommand);
    console.log('Bucket created successfully:', data.Location);
  } catch (err) {
    if (err.name === 'BucketAlreadyOwnedByYou') {
      console.log('Bucket already exists:', bucketName);
    } else {
      console.error('Error creating bucket:', err);
    }
  }
};

const listBuckets = async () => {
  try {
    const listBucketsCommand = new ListBucketsCommand({});
    const data = await s3Client.send(listBucketsCommand);
    console.log('S3 buckets:', data.Buckets);
  } catch (err) {
    console.error('Error listing S3 buckets:', err);
  }
};

const listObjectsInBucket = async () => {
  try {
    const listObjectsCommand = new ListObjectsV2Command({ Bucket: bucketName });
    const data = await s3Client.send(listObjectsCommand);
    console.log('Objects in bucket:', data.Contents);
  } catch (err) {
    console.error('Error listing objects in bucket:', err);
  }
};

const run = async () => {
  await createBucket();
  await listBuckets();
  await listObjectsInBucket();
};

run().catch(console.error);

export default s3Client;

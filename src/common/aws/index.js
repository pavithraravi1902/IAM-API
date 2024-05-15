import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  endpoint: 'http://localhost:4566',
  accessKeyId: 'awsUserAuthentication',  
  secretAccessKey: 'awsUserAuthenticationKey',  
  region: 'eu-west-1',  
  s3ForcePathStyle: true,  
});

const bucketParams = {
  Bucket: 'userauthentication',
};

s3Client.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.error('Error creating bucket:', err);
  } else {
    console.log('Bucket created successfully:', data.Location);
  }
});

export default s3Client;
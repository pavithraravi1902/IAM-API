import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  endpoint: 'http://localhost:4566',
  accessKeyId: 'awsUserAuthentication',  
  secretAccessKey: 'awsUserAuthenticationKey',  
  region: 'eu-west-1',  
  s3ForcePathStyle: true,  
});

export default s3Client;
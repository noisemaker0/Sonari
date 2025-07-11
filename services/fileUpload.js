const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET = process.env.AWS_S3_BUCKET;

async function uploadToS3(buffer, filename, mimetype) {
  const params = {
    Bucket: BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read',
  };
  return s3.upload(params).promise();
}

// Placeholder for delete function
async function deleteFromS3(filename) {
  // Implement as needed
}

module.exports = { uploadToS3, deleteFromS3 };
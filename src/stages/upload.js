import fs from "fs";
import AWS from "aws-sdk";
import mbxUploads from "@mapbox/mapbox-sdk/services/uploads.js";
import * as config from "../config.js";

const getCredentials = async (client) => {
  console.log("Getting credentials...");
  const response = await client.createUploadCredentials().send();
  return response.body;
};

const moveToS3 = async (creds, filepath) => {
  console.log("Moving file to S3...");
  const s3 = new AWS.S3({
    accessKeyId: creds.accessKeyId,
    secretAccessKey: creds.secretAccessKey,
    sessionToken: creds.sessionToken,
    region: "us-east-1",
  });
  return await s3
    .putObject({
      Bucket: creds.bucket,
      Key: creds.key,
      Body: fs.createReadStream(filepath),
    })
    .promise();
};

const performUpload = async (client, creds) => {
  console.log("Created a Mapbox Upload...");
  const response = await client
    .createUpload({
      tileset: `${config.MAPBOX_USERNAME}.${config.MAPBOX_TILESET_NAME}`,
      url: creds.url,
      name: config.MAPBOX_TILESET_NAME,
    })
    .send();
  return response.body;
};

export const upload = async (filepath) => {
  const client = mbxUploads({ accessToken: config.MAPBOX_API_TOKEN });
  const creds = await getCredentials(client);
  const _ = await moveToS3(creds, filepath);
  const results = await performUpload(client, creds);
  console.log("Finished upload process");
  console.log(results);
};

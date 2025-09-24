import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: "your-region" }); // e.g. "ap-south-1"
const topicArn = "arn:aws:sns:your-region:your-account-id:ImageUploadNotification";

export const handler = async (event) => {
  // Loop through each record from the S3 event
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    const message = `Image uploaded to bucket ${bucket} with key ${key}`;

    // Publish message to SNS
    const command = new PublishCommand({
      TopicArn: topicArn,
      Message: message,
      Subject: "Image Upload Notification",
    });

    await snsClient.send(command);
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Notification sent successfully!"),
  };
};

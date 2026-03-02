import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqs = new SQSClient({});

export const handler = async (event) => {
    const command = new SendMessageCommand({
        QueueUrl: "YOUR_SQS_QUEUE_URL_HERE",
        MessageBody: JSON.stringify({ orderId: 123, status: "Pending" })
    });

    await sqs.send(command);
    
    return { statusCode: 200, body: "Message sent to Queue!" };
};
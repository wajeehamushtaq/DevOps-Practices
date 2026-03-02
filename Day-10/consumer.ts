export const handler = async (event) => {
    // SQS sends messages in a "Records" array
    for (const record of event.Records) {
        const messageBody = record.body;
        console.log("Processing message:", messageBody);
        
        // This is where you would save to DynamoDB or send an email
        // Logic: const data = JSON.parse(messageBody);
    }
    
    return { statusCode: 200, body: "Processed" };
};
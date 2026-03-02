## The Secret Messengers (SQS & SNS)

Today, we move from "Direct Talk" to "Leaving a Message."

Up until now, your API Gateway calls your Lambda directly. If the Lambda is busy or crashes, the request fails. In the professional world (and on the DVA-C02 exam), we use Asynchronous Messaging to make our apps "bulletproof."

1. What is SQS? (The Waiting Room)
SQS (Simple Queue Service) is like a "To-Do" list for your code.

How it works: Instead of API Gateway talking to Lambda, it sends a message to an SQS Queue. The Lambda then picks up messages from that queue when it's ready.

Why use it? (Decoupling): If your database goes down for 5 minutes, SQS holds the messages. When the database comes back, the Lambda processes them. No data is lost.

Exam Tip: SQS is "Pull" (The receiver must ask for messages).

2. What is SNS? (The Megaphone)
SNS (Simple Notification Service) is for broadcasting messages.

How it works: You send one message to an SNS Topic. Multiple "subscribers" (like an Email, a Lambda, or an SQS queue) all get a copy of that message at the same time.

Exam Tip: SNS is "Push" (It sends the message out immediately to everyone).

## SQS vs. SNS: Which one do I use?
The exam will try to trick you here. Remember this:
- Use SQS if you want to make sure a task gets done eventually by one worker.
- Use SNS if you want to notify many different systems or people at once.

Scenario: Your application is dropping requests during peak hours because the database is too slow to handle the sudden spikes. How do you fix this?
Answer: Place an SQS Queue between the API and the database to "buffer" the requests.

Question: Your Consumer Lambda takes 40 seconds to process a message, but the message reappears in the queue after 30 seconds, causing it to be processed twice. How do you fix this?
Answer: Increase the Visibility Timeout of the SQS Queue. It must be longer than the Lambda's execution time so the message stays "hidden" while being worked on.
--
-----------------------------------------------------------------------------------------------------
Today's Summary
- Decoupling: Using SQS ensures that even if the consumer is slow, the producer can keep working.
- Event Source Mapping: The mechanism that polls SQS and triggers Lambda.
- Batching: Processing multiple messages in one Lambda execution to optimize costs.
- Visibility Timeout: The period where a message is "invisible" to other consumers while one is processing it
--
-----------------------------------------------------------------------------------------------------
## Setup SQS with lambda
### Step 1: Create an SQS Queue
- Go to the SQS Console > Create queue.
- Choose Standard (Cheaper, best for most things).
- Name it MyTaskQueue.
- Leave everything else as default and click Create.

### Step 2: The "Producer" Lambda
We need a Lambda that "produces" a message and puts it in the queue

### Step 3: Setup IAM role
Your Consumer Lambda needs permission to "talk" to SQS to pull and delete messages. Go to the IAM Role of your Consumer Lambda.

Attach a policy with these actions for your SQS ARN:
sqs:ReceiveMessage
sqs:DeleteMessage
sqs:GetQueueAttributes
Add sqs:SendMessage on Producer lambda

Pro Tip: Use the AWS managed policy AWSLambdaSQSQueueExecutionRole for a quick setup.

### Step 4: Add the SQS Trigger
Now, you must tell AWS to connect the two.

In the Lambda Console for your Consumer, click + Add trigger.
Select SQS.
Select your queue (MyTaskQueue).
Batch Size: Set this to 10. (This means Lambda will process up to 10 messages at once to save money).
Click Add.

### Practical Test: The Full Chain
- Open your Producer Lambda and click "Test" (this sends a message to SQS).
- Wait 2 seconds.
- Open the Consumer Lambda > Monitor tab > View CloudWatch Logs.
- You should see your "Processing message: ..." log appearing there!



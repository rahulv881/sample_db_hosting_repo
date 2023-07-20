import { Promise } from "bluebird";
import RabbitMQUtil from "./client";


export async function sendMessageToServiceBackendPOC(num: number) {
  try {
    const channel = await RabbitMQUtil.getChannel();
    const queueName = 'rpc_queue';
    const correlationId = "test";
    const queue = await channel.assertQueue('', { exclusive: true });

    channel.sendToQueue(queueName,
        Buffer.from(num.toString()), {
        correlationId: correlationId,
        replyTo: queue.queue
    });

    const data = await new Promise((resolve,rej) => {
        channel.consume(queue.queue, function (msg) {
            if (msg.properties.correlationId == correlationId) {
                const data = msg.content.toString();
                resolve(data);
            }
        }, {
            noAck: true
        });
    })

    return data;

  } catch (error) {
    console.error('Error sending message to Service B:', error);
    throw error; 
  }
}


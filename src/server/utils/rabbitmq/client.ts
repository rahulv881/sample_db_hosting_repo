import { CONSTANT_CONFIG } from '../../../config/CONSTANT_CONFIG';
const { RABBIT_MQ } = CONSTANT_CONFIG;
import amqp from 'amqplib';

class RabbitMQUtil {
  private static connection;
  private static channel;
//   private static queues: unknown[]; // TODO: Add queues
  private RabbitMQUtil() {}

  public static async getConnection() {
    if (!RabbitMQUtil.connection) {
      RabbitMQUtil.connection = await amqp.connect(RABBIT_MQ.URL);
    }

    return RabbitMQUtil.connection;
  }

  // * Keeping single channel for all queues for now.
  public static async getChannel() {
    if (!RabbitMQUtil.channel) {
      const connection = await RabbitMQUtil.getConnection();
      RabbitMQUtil.channel = await  connection.createChannel();
    }

    return RabbitMQUtil.channel;
  }

  // TODO: Add queues 
//   public static async createQueue(queueName) {
//     if (!RabbitMQUtil.channel) {
//       const connection = await RabbitMQUtil.getConnection();
//       RabbitMQUtil.channel = await  connection.createChannel();
//     }

//     return RabbitMQUtil.channel;
//   }

  
  public static async closeRabbitMQConnection() {
    try {
      console.log('Closing RabbitMQ connection...');

      const instance = await RabbitMQUtil.getConnection();
      await instance.close();
      console.log('RabbitMQ connection closed gracefully.');
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
    }
  }

  public static async closeRabbitMQChannel() {
    try {
      console.log('Closing RabbitMQ channel...');

      const instance = await RabbitMQUtil.getConnection();
      await instance.close();
      console.log('RabbitMQ channel closed gracefully.');
    } catch (error) {
      console.error('Error closing RabbitMQ channel:', error);
    }
  }
}

export default RabbitMQUtil;

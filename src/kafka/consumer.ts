import { EachMessagePayload } from 'kafkajs';
import { kafka } from './config';
import dotenv from 'dotenv';
import { updateUserBalanceRepo } from '../repository/user/register.repo';

dotenv.config();
export const kafkaConsumer = async () => {
  const consume = kafka.consumer({
    groupId: `${process.env.KAFKA_CLIENTID}`,
  });

  await consume.connect();
  await consume.subscribe({ topic: `${process.env.KAFKA_TOPIC}` });
  await consume.run({
    eachMessage: async (message: EachMessagePayload) => {
      const key = message.message.key!.toString();
      const value = JSON.parse(message.message.value!.toString());

      if (key === 'transactionCreated') {
        await updateUserBalanceRepo(
          +value.user_1,
          +value.user_1_balance,
          +value.user_2,
          +value.user_2_balance
        );
        console.log('\nKafka ADMIN service (Consumer): User balance updated\n');
      }
    },
  });
};

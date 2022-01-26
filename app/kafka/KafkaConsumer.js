const { Kafka } = require('kafkajs')
const userService = require('../services/UserService')
const userModel = require('../models/UserModel');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

class kafkaConsumer {
  constructor() {
    this.init();
  }

  async init(){
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
        const data = JSON.parse(message.value.toString());
        await userService.addUser(data,null);
      },
    })
  }
}

module.exports = new kafkaConsumer();

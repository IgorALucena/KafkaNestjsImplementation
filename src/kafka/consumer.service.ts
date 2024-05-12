import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class KafkaConsumer implements OnApplicationShutdown{ 
    private readonly kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    })
    private readonly consumers: Consumer[]=[];

    /*OBS: o consume recebe o topico do parametro e logo em seguida se inscreve com as devidas configurações*/
    async consume(topics:ConsumerSubscribeTopics, config: ConsumerRunConfig){
        const consumer = this.kafka.consumer({groupId:'nestjs-kafka'});
        await consumer.connect();
        await consumer.subscribe(topics);
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for(const consumer of this.consumers){
            await consumer.disconnect();
        }
    }
}
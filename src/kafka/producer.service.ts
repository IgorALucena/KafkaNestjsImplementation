import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class KafkaProducer implements OnModuleInit, OnApplicationShutdown {

    private readonly kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    })

    private readonly producer: Producer = this.kafka.producer()

    async onModuleInit() {
        await this.producer.connect()
    }


    async produce(record: ProducerRecord) {
        /* 3- produce faz o envio do que foi passado por parametro para o topic test*/
        await this.producer.send(record); 
    }

    async onApplicationShutdown() {
        await this.producer.disconnect()
    }


}
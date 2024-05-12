import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumer } from "./kafka/consumer.service";
import { partition } from "rxjs";

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(private readonly kafkaConsumer: KafkaConsumer){}

    /* 4 - o consume entra em ação para captar as mensagens enviadas para o topic */
    async onModuleInit() {
        await this.kafkaConsumer.consume(
            {topics:['test']},
            {
                eachMessage: async ({topic, partition, message}) =>{
                    console.log({
                        value: message.value.toString(),
                        topic: topic.toString(),
                        partition: partition.toString(),
                    })
                }
            }
        )
    }
}
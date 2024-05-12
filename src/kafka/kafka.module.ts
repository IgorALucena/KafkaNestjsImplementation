import { Module } from "@nestjs/common";
import { KafkaProducer } from "./producer.service";
import { KafkaConsumer } from "./consumer.service";

@Module({
    imports:[],
    controllers:[],
    providers:[KafkaProducer, KafkaConsumer],
    exports:[KafkaProducer, KafkaConsumer],

})

export class KafkaModule{}
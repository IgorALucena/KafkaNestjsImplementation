import { Injectable } from '@nestjs/common';
import { KafkaProducer } from './kafka/producer.service';

@Injectable()
export class AppService {

  constructor(private readonly producer: KafkaProducer){}

  async getHello() {
    /*2- appService chama o producer enviando os parametros */
    await this.producer.produce({
      topic:'test',
      messages:[{
        value:'Hello World'
      }]
    })
    return 'Hello World'
  }
}

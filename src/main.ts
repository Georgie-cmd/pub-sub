import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RedisIoAdapter } from './adapter/adapter';


require('redis').createClient().on("message",  (command, param) => {
    console.log("SMS " + command + ` ${param}`)
  
    //process.exit(1)
  }).subscribe("event")


async function start() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule, 
        new FastifyAdapter()
    )
    await app.listen(process.env.PORT)
    app.useWebSocketAdapter(new RedisIoAdapter(app))
    console.log('Microservice has been run on port 5000...')
}
start()
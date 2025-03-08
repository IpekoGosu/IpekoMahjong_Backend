import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerService } from '@src/common/logger/winston.logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(WinstonLoggerService));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

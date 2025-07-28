import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CONSTANTS } from './config/constants';


@Module({
  imports: [ProductModule, MongooseModule.forRoot(CONSTANTS.CONNECT_TO_DB!)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

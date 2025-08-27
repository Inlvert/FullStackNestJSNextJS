import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CONSTANTS } from './config/constants';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(CONSTANTS.CONNECT_TO_DB!),
    ProductModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

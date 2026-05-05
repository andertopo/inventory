import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://andersontorres9012_db_user:PTN1VpRT7Cel6t2q@cluster0.okfhp2t.mongodb.net/?appName=Cluster0"),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

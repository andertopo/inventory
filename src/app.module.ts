import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://andersontorres9012_db_user:PTN1VpRT7Cel6t2q@cluster0.okfhp2t.mongodb.net/?appName=Cluster0"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true, // Protocolo moderno recomendado
      },
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

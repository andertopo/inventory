import { ReflectionService } from '@grpc/reflection';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'product',
    protoPath: join(__dirname, './product/infrastructure/grpc/product.proto'),
    url: '0.0.0.0:50052',
    onLoadPackageDefinition: (pkg, server) => new ReflectionService(pkg).addToServer(server),
  },
};
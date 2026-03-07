import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetModule } from './snippet/snippet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_URI!), 
    SnippetModule, 
  ],
  controllers: [AppController],
  providers: [AppService],      
})
export class AppModule {}
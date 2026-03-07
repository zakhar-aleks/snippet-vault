import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';
import { Snippet, SnippetSchema } from "./snippet.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }])],
    controllers: [SnippetController],
    providers: [SnippetService] 
})
export class SnippetModule {}

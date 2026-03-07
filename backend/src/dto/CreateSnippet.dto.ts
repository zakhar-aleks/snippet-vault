import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";
import { SnippetType } from "src/snippet/snippet.schema";

export class CreateSnippetDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsNotEmpty()
    @IsEnum(SnippetType, {
        message: "Type must be either link, note, or command",
    })
    type: SnippetType;
}

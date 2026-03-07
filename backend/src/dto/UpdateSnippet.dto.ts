import { PartialType } from "@nestjs/mapped-types";
import { CreateSnippetDto } from "./CreateSnippet.dto";

export class UpdateSnippetDto extends PartialType(CreateSnippetDto) {}

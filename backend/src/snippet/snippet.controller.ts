import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	ValidationPipe,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
import { SnippetService } from "./snippet.service";
import { CreateSnippetDto } from "src/dto/CreateSnippet.dto";
import { UpdateSnippetDto } from "src/dto/UpdateSnippet.dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import type { MongoID } from "./snippet.service";

@Controller("snippet")
export class SnippetController {
	constructor(private readonly snippetService: SnippetService) { }

	@Get()
	@HttpCode(HttpStatus.OK)
	async getSnippets(
		@Query("page") page: number,
		@Query("limit") limit: number,
		@Query("q") q: string,
		@Query("tag") tag: string,
	) {
		return this.snippetService.findAllSnippets({ page, limit, q, tag });
	}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	async getSnippet(@Param("id", ParseObjectIdPipe) id: MongoID) {
		return this.snippetService.findOneSnippet(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createSnippet(@Body(ValidationPipe) body: CreateSnippetDto) {
		return this.snippetService.createSnippet(body);
	}

	@Patch("/:id")
	@HttpCode(HttpStatus.OK)
	async updateSnippet(
		@Param("id", ParseObjectIdPipe) id: MongoID,
		@Body(ValidationPipe) body: UpdateSnippetDto,
	) {
		return this.snippetService.updateSnippet(id, body);
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteSnippet(@Param("id", ParseObjectIdPipe) id: MongoID) {
		return this.snippetService.deleteSnippet(id);
	}
}

import { Controller } from "@nestjs/common";
import { SnippetService } from "./snippet.service";

@Controller("snippet")
export class SnippetController {
	constructor(private readonly snippetService: SnippetService) {}
}

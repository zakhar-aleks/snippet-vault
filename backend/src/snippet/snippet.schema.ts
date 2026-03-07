import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SnippetDocument = HydratedDocument<Snippet>;
export enum SnippetType {
	LINK = "link",
	NOTE = "note",
	COMMAND = "command",
}

@Schema({ timestamps: true })
export class Snippet {
	@Prop({ required: true, index: true })
	title: string;

	@Prop({ required: true, index: true })
	content: string;

	@Prop()
	tags: string[];

	@Prop({ required: true })
	type: SnippetType;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

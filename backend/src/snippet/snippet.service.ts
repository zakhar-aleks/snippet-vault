import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Snippet, SnippetDocument } from "./snippet.schema";
import { Model, Types } from "mongoose";
import { CreateSnippetDto } from "src/dto/CreateSnippet.dto";
import { UpdateSnippetDto } from "src/dto/UpdateSnippet.dto";

export type MongoID = Types.ObjectId | string;

@Injectable()
export class SnippetService {
    constructor(
        @InjectModel(Snippet.name)
        private readonly snippetModel: Model<SnippetDocument>,
    ) { }

    public async createSnippet(createSnippetDto: CreateSnippetDto) {
        const newSnippet = new this.snippetModel(createSnippetDto);

        return newSnippet.save();
    }

    public async findAllSnippets(query: {
        page?: number;
        limit?: number;
        q?: string;
        tag?: string;
    }) {
        const { page = 1, limit = 10, q, tag } = query;
        const filter: any = {};

        if (tag) {
            filter.tags = tag;
        }

        if (q) {
            const regex = new RegExp(q, "i");

            filter.$or = [
                { title: { $regex: regex } },
                { content: { $regex: regex } },
            ];
        }

        const skip = (page - 1) * limit;
        const items = await this.snippetModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.snippetModel.countDocuments(filter);

        return {
            data: items,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    public async findOneSnippet(id: MongoID) {
        const snippet = await this.snippetModel.findById(id).exec();

        if (!snippet) throw new NotFoundException("Snippet not found");

        return snippet;
    }

    public async updateSnippet(id: MongoID, updateSnippetDto: UpdateSnippetDto) {
        const updatedSnippet = await this.snippetModel
            .findByIdAndUpdate(id, updateSnippetDto, { returnDocument: 'after' })
            .exec();

        if (!updatedSnippet) throw new NotFoundException("Snippet not found");

        return updatedSnippet;
    }

    public async deleteSnippet(id: MongoID) {
        const result = await this.snippetModel.findByIdAndDelete(id).exec();

        if (!result) throw new NotFoundException("Snippet not found");

        return { deleted: true };
    }
}

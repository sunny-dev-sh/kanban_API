import { PartialType } from "@nestjs/mapped-types";
import { CreateStoryDto } from "../create-story.dto/create-story.dto";

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}

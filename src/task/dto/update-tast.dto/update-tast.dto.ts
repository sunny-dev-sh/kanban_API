import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "../create-tast.dto/create-tast.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

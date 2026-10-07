import type { SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { post } from "./post";
import { short } from "./short";
import { tag } from "./tag";

export const schemaTypes: SchemaTypeDefinition[] = [post, category, tag, short];

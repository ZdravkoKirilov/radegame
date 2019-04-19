import { BaseModel, WithDisplayName, WithKeywords } from "./Base.model";

export type Keyword = BaseModel & WithDisplayName & WithKeywords & Partial<{
}>

// has display name in order to be rendered on cards
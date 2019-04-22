import { BaseModel, WithDisplayName, WithKeywords } from "./Base.model";

export type Keyword = BaseModel & WithDisplayName & Partial<{
}>

// has display name in order to be rendered on cards
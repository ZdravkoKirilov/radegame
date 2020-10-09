import { BaseControl } from './Base.model';
import { ConnectedEntities } from './ConnectedEntities';

export type FormDefinition<T> = (data: T, entities: ConnectedEntities) => BaseControl[];

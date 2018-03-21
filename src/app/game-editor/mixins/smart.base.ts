import { FormDefinition, ConnectedEntities } from '../../dynamic-forms';

export abstract class SmartBase<T> {

    public formDefinition: FormDefinition;
    public showEditor: boolean;
    public items: T[];
    public selectedItem: T;
    public connectedEntities?: ConnectedEntities;

    abstract saveItem(data: T): void;
    abstract removeItem(payload: T): void;
    abstract editItem(payload: T): void;
    abstract changeSelectedItem(payload: T): void;
    abstract toggleEditor(flag: boolean): void;
}
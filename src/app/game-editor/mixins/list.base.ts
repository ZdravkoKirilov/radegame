import { Input, Output, EventEmitter } from '@angular/core';

export abstract class ListBase<T> {

    @Input() items: T[];

    @Output() editItem: EventEmitter<T> = new EventEmitter();
    @Output() removeItem: EventEmitter<T> = new EventEmitter();

}
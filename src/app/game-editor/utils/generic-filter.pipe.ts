import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterBy' })
export class GenericFilterPipe implements PipeTransform {
  transform(entities: any[], predicate: Record<string, string>): any[] {
    return entities.filter(entity => Object.keys(predicate).every(key => entity[key] === predicate[key]));
  }
}
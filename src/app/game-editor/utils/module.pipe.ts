import { Pipe, PipeTransform } from '@angular/core';
import { GameEntity, ModuleId } from '@app/game-mechanics';

@Pipe({ name: 'forModule' })
export class ModulePipe implements PipeTransform {
  transform(entities: any[], moduleId: ModuleId): any[] {
    return entities.filter(entity => String(entity['module']) === String(moduleId));
  }
}
import { FactionEffectsService } from './byFeature/faction.effects';
import { ResourceEffectsService } from './byFeature/resource.effects';
import { FieldEffectsService } from './byFeature/field.effects';
import { MapEffectsService } from './byFeature/map.effects';
import { LauncherEffectsService } from './byFeature/launcher.effects';
import { AssetEffectsService } from './byFeature/asset.effects';
import { ActivityEffectsService } from './byFeature/activity.effects';

export * from './byFeature/faction.effects';
export * from './byFeature/resource.effects';
export * from './byFeature/field.effects';
export * from './byFeature/map.effects';
export * from './byFeature/launcher.effects';
export * from './byFeature/asset.effects';
export * from './byFeature/activity.effects';

export const effects = [
    FactionEffectsService,
    ResourceEffectsService,
    FieldEffectsService,
    MapEffectsService,
    LauncherEffectsService,
    AssetEffectsService,
    ActivityEffectsService
];

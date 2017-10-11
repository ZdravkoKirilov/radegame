import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexComponent} from './index/index.component';
import {RouterModule} from '@angular/router';
import {routes} from './routing';

import {NgMaterialModule} from '../ng-material/ng-material.module';
import {GameElementsModule} from '../game-elements/game-elements.module';
import {GeneralSettingsComponent} from './components/general-settings/general-settings.component';
import {ResourcesComponent} from './components/resources/resources.component';
import {CharactersComponent} from './components/characters/characters.component';
import {FieldsComponent} from './components/fields/fields.component';
import {TriviaComponent} from './components/trivia/trivia.component';
import {TrapsComponent} from './components/traps/traps.component';
import {ResolutionsComponent} from './components/resolutions/resolutions.component';
import {TurnFlowComponent} from './components/turn-flow/turn-flow.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        GameElementsModule,
        NgMaterialModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [IndexComponent, GeneralSettingsComponent, ResourcesComponent, CharactersComponent, FieldsComponent,
        TriviaComponent, TrapsComponent, ResolutionsComponent, TurnFlowComponent]
})
export class GameEditorModule {
}

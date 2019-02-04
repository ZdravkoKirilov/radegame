import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { DividerComponent, MainMenuComponent, SocialButtonComponent } from './components';

import { EditHeaderComponent } from './layouts/editing/header/edit-header.component';
import { EditSidebarComponent } from './layouts/editing/sidebar/edit-sidebar.component';
import { EditorLayoutComponent } from './layouts/editing/editor-layout.component';
import { EditSidebarHeaderComponent } from './layouts/editing/sidebar/header/edit-sidebar-header.component';
import { EditSidebarNavComponent } from './layouts/editing/sidebar/nav/edit-sidebar-nav.component';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgScrollbarModule
    ],
    exports: [
        CommonModule,
        NgMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DividerComponent, MainMenuComponent, SocialButtonComponent,
        NgScrollbarModule,
        EditHeaderComponent,
        EditSidebarComponent,
        EditorLayoutComponent
    ],
    declarations: [
        DividerComponent, MainMenuComponent, SocialButtonComponent, EditHeaderComponent,
        EditSidebarComponent, EditorLayoutComponent, EditSidebarHeaderComponent, EditSidebarNavComponent
    ],
    providers: []
})
export class SharedModule {
}

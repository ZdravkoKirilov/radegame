import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { DividerComponent, MainMenuComponent, SocialButtonComponent } from './components';
import { ServeImagePipe } from './pipes';
import { OverlayComponent } from './components/overlay/overlay.component';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgScrollbarModule, RouterModule,
    ],
    exports: [
        CommonModule,
        NgMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DividerComponent, MainMenuComponent, SocialButtonComponent,
        NgScrollbarModule,
        ServeImagePipe,
        OverlayComponent,
        NotificationComponent
    ],
    declarations: [
        DividerComponent, MainMenuComponent, SocialButtonComponent, ServeImagePipe, OverlayComponent, NotificationComponent
    ],
    entryComponents: [
        OverlayComponent
    ],
    providers: []
})
export class SharedModule {
}

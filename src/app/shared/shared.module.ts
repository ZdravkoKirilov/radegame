import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgMaterialModule } from './ng-material/ng-material.module';
import { DividerComponent, MainMenuComponent, SocialButtonComponent } from './components';
import { ServeImagePipe } from './pipes';
import { OverlayComponent } from './components/overlay/overlay.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { AppOverlayService } from './services/overlay/app-overlay.service';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, ColorPickerModule,
    ],
    exports: [
        CommonModule,
        NgMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DividerComponent, MainMenuComponent, SocialButtonComponent,
        ServeImagePipe,
        OverlayComponent,
        NotificationComponent,
        ColorPickerModule,
        ProfileMenuComponent,
        LoaderComponent,
    ],
    declarations: [
        DividerComponent, MainMenuComponent, SocialButtonComponent, ServeImagePipe, OverlayComponent, NotificationComponent,
        ProfileMenuComponent,
        LoaderComponent
    ],
    providers: [
        AppOverlayService
    ]
})
export class SharedModule {
}

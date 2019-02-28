import { Injectable, ComponentRef, Component } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { AppOverlayRef } from './app-overlay-ref';

export interface Image {
    name: string;
    url: string;
}

interface AppOverlayData {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    data?: any;
    height?: string;
}

const DEFAULT_CONFIG: AppOverlayData = {
    hasBackdrop: true,
    backdropClass: 'backdrop',
    panelClass: 'panel',
    data: null,
}

@Injectable({
    providedIn: 'root'
})
export class AppOverlayService {

    constructor(
        private overlay: Overlay) { }

    open(component: any, config: AppOverlayData = {}) {
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };
        const overlayRef = this.createOverlay(dialogConfig);
        const dialogRef = new AppOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(component, overlayRef);
        overlayComponent.data = config.data;

        return [dialogRef, overlayComponent] as [AppOverlayRef, any];
    }

    private createOverlay(config: AppOverlayData) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(component: any, overlayRef: OverlayRef) {
        const containerPortal = new ComponentPortal(component);
        const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private getOverlayConfig(config: AppOverlayData): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}
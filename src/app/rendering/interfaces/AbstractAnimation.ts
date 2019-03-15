import { Component } from "../models";

export abstract class AbstractAnimation {
    abstract isPlaying: boolean;

    abstract play(target: Component): void;
    abstract pause(): void;
    abstract revert(): void;
};
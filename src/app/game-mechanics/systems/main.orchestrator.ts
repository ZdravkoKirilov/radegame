/* tslint:disable */

import { Injectable } from '@angular/core';

import * as gens from './generators';

Injectable()
export class MainOrchestrator {

    private queue: any; // resolver // acts as a "reservation for the next .next() call"

    private roundGen;
    private playerGen;
    private turnGen;
    private actionGen;

    private turnSeed; // used to restart turnGenerator
    private playerSeed; // used to restart playerGenerator

    public seed(data) {
        this.startRoundGenerator(data);
        this.startPlayerGenerator(data);
        this.startTurnGenerator(data);
    }

    // returns actions[]
    public next(action: any, state: any): any {
        if (this.queue) {
            return this.queue(action);
        } else {
            const result = this.createNext(action, state);
            this.refreshGenerators(action, state);
            return result;
        }
    }

    private createNext(action, state) {

        let result = [];

        if (this.actionGen.isFull) {
            if (this.turnGen.isFull && this.playerGen.isFull) {
                result.push(this.roundGen.next());
            }
            result = [
                ...result,
                ...this.turnGen.next(),
                ...this.playerGen.next(),
            ];
        }

        result.push(this.actionGen.next(action, state));

        return result;
        // 1 option: these generators know internally whether to really fire: based on state. Drawback: tight coupling to the shape of state object
        // 2 option: the orchestrator here checks their statuses and decides instead. This way subgenerators are generic

        // * @ component: .next() is called @ 1. Event Handlers ( will create a queue ) 2. OnChange -> when lowest level actionGen changes -> will trigger a change on smth like 'lastOperation' @ store
    }

    private refreshGenerators(action, state) {

    }

    private startRoundGenerator(data) { }
    private startPlayerGenerator(data) { }
    private startTurnGenerator(data) { }
    private startActionGenerator(data) { } // this one can read the store and generate the upcoming actions which the player has placed
}

// generators created at Orchestrator constructor: rounds, players, turn actions
// generators created dynamically: action resolving ( open question is if order matters)

// additional questions: multiple levels of game 'state', probably tied to generators
// Orchestrator is called at: event handlers + ngOnChanges

// resolvers filter out inappropriate actions: if null is returned = > the ochestrator knows to keep the queue in anticipation of correct input

// + another concept: dispatchers: @ components

// possibility: Common interface for orchestrator + nested generators: they could have their own queue and .next()

// resolvers: return action[] and optional callback to be called next
import { Injectable } from '@angular/core';

import { Generator, PlayerAction } from '../models';
import { createGenerator } from './generators';

Injectable()
export class MainOrchestrator {

    roundGenerator: Generator;
    phaseGenerator: Generator;
    turnGenerator: Generator;
    actionGenerator: Generator;

    next(action: PlayerAction, state: any): PlayerAction[] {
        const { roundGenerator, phaseGenerator, turnGenerator, actionGenerator } = this;
        let result: PlayerAction[] = [];

        if (roundGenerator.isFull) {
            result = [...roundGenerator.next(action, state)];
        } else if (phaseGenerator.isFull) {
            result = [...phaseGenerator.next(action, state)];
        } else if (turnGenerator.isFull) {
            result = [...turnGenerator.next(action, state)];
        } else {

            if (actionGenerator.isEmpty) {
                if (turnGenerator.isEmpty) {
                    if (phaseGenerator.isEmpty) {
                        if (roundGenerator.isEmpty) {
                            // game has ended
                        } else {
                            this.initPhaseGenerator(state);
                            result = [...roundGenerator.next(action, state)];
                        }
                    } else {
                        this.initTurnGenerator(state);
                        result = [...phaseGenerator.next(action, state)];
                    }
                } else {
                    this.initActionGenerator(state);
                    result = [...turnGenerator.next(action, state)];
                }
            } else {
                result = [...actionGenerator.next(action, state)];
            }
        }

        return result;
    }

    init(state: any) {
        this.initRoundGenerator(state);
        this.initPhaseGenerator(state);
        this.initTurnGenerator(state);
        this.initActionGenerator(state);
    }

    initRoundGenerator(state) {
        const resolvers = []
        this.roundGenerator = createGenerator('ROUND', resolvers);
    }
    initPhaseGenerator(state) {
        const resolvers = []
        this.phaseGenerator = createGenerator('PHASE', resolvers);
    }
    initTurnGenerator(state) {
        const resolvers = []
        this.turnGenerator = createGenerator('TURN', resolvers);
    }
    initActionGenerator(state) {
        const resolvers = []
        this.actionGenerator = createGenerator('ACTION', resolvers);
    }
}

// generators created at Orchestrator constructor: rounds, players, turn actions
// generators created dynamically: action resolving ( open question is if order matters)

// additional questions: multiple levels of game 'state', probably tied to generators
// Orchestrator is called at: event handlers + ngOnChanges

// resolvers filter out inappropriate actions: if null is returned = > the ochestrator knows to keep the queue in anticipation of correct input

// + another concept: dispatchers: @ components

// possibility: Common interface for orchestrator + nested generators: they could have their own queue and .next()

// resolvers: return action[] and optional callback to be called next
import { TerminationType } from '../systems/termination/constants';

export interface Termination {
    id?: number;
    type?: TerminationType;
}

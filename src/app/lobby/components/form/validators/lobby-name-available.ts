import { AbstractControl } from "@angular/forms";
import { map, switchMap, first } from "rxjs/operators";

import { LobbyService } from "../../../services/lobby.service";
import { timer } from "rxjs";

export const createNameValidator = (api: LobbyService, minLength = 3) => (control: AbstractControl) => {

    if (control.value.length >= minLength) {
        return timer(1000).pipe(
            switchMap(() => api.fetchLobby(control.value).pipe(
                map(lobby => {
                    return lobby ? { nameTaken: true } : null;
                }),
            )),
            first()
        );
    } else {
        return Promise.resolve(null);
    }
};
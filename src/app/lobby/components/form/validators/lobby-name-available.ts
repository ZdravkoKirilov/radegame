import { AbstractControl } from "@angular/forms";
import { map, switchMap, first, catchError } from "rxjs/operators";

import { LobbyService } from "../../../services/lobby.service";
import { timer, of } from "rxjs";

export const createNameValidator = (api: LobbyService, minLength = 3) => (control: AbstractControl) => {

    if (control.value.length >= minLength) {
        return timer(1000).pipe(
            switchMap(() => api.fetchLobby(control.value).pipe(
                map(lobby => {
                    return lobby ? { nameTaken: true } : null;
                }),
                catchError(() => {
                    return of(null);
                })
            )),
            first()
        );
    } else {
        return Promise.resolve(null);
    }
};
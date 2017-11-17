import {Subject} from 'rxjs/Subject';

export abstract class RendererMessageProtocol<T, P> {
    public objectAdded: Subject<T> = new Subject();
    public objectModified: Subject<T> = new Subject();
    public objectSelected: Subject<T> = new Subject();
    public objectDeselected: Subject<any> = new Subject();
    public pathSelected: Subject<P> = new Subject();
    public pathDeselected: Subject<any> = new Subject();
    public onEnterKey: Subject<any> = new Subject();
    public onDeleteKey: Subject<any> = new Subject();
}
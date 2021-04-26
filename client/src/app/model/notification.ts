import { Action } from '../resources/action';
import { User } from './user';

export interface Notification{
    from?: User;
    action?: Action;
    info?: string;
}


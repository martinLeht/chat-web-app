import {User} from './user';
import {Action} from '../resources/action';

export interface Message {
    sender?: User;
    body?: any;
    action?: Action;
    creationTime?: Date;
    updateTime?: Date;
}

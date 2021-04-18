import { UserDTO } from "./UserDTO";

export interface MessageDTO {
    sender: string;
    body: any;
    creationDateTime?: Date;
    updatedDateTime?: Date;
}
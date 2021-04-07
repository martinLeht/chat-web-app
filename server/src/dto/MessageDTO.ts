import { UserDTO } from "./UserDTO";

export interface MessageDTO {
    sender: string;
    body: string;
    creationDateTime?: Date;
    updatedDateTime?: Date;
}
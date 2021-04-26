import { UserDTO } from "./UserDTO";

export interface MessageDTO {
    sender: UserDTO;
    body: any;
    creationDateTime?: Date;
    updatedDateTime?: Date;
}
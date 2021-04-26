import { UserDTO } from "./UserDTO";

export interface NotificationDTO {
    from: UserDTO;
    action: string;
    creationDateTime?: Date;
}
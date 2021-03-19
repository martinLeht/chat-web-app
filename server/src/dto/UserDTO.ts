export interface UserDTO {
    userId?: number;
    username: string;
    email: string;
    password?: string;
    creationDateTime?: Date;
    updatedDateTime?: Date;
}
import ITempUserRepository from "../repositories/interfaces/ITempUserRepository";

let TYPES = {
    /* Routes */
    UserRoutes: Symbol("UserRoutes"),
    TempUserRoutes: Symbol("TempUserRoutes"),
    /* Controllers */
    UserController: Symbol("UserController"),
    TempUserController: Symbol("TempUserController"),
    /* Services */
    SocketService: Symbol("SocketService"),
    IUserService: Symbol("IUserService"),
    ITempUserService: Symbol("ITempUserService"),
    /* Repositories */
    IUserRepository: Symbol("IUserRepository"),
    ITempUserRepository: Symbol("ITempUserRepository")
};

export default TYPES;
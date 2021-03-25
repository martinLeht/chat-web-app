import { injectable } from "inversify";
import IUserRepository from "./interfaces/IUserRepository";
import User from "../models/User";
import IUser from "../models/interfaces/IUser";
import { UserDTO } from "../dto/UserDTO";

@injectable()
class UserRepository implements IUserRepository {
    
    /**
     * Method to fetch all users
     * 
     * @return
     *      IUser[] | undefined all users from db
     */
    public async findAll(): Promise<IUser[]> {
        try {
            console.log("Finding users...");
            const users: IUser[] = await User.find().exec();
            
            if (users.length === 0) return [];

            console.log(users);
            return users;  
        } catch(Error) {
            console.log("ERROR ON findAll");
            console.log(Error.message);
            return [];
        }
    }

    /**
     * Method to fetch user by id
     * 
     * @param {number} id
     *      id of the user to be fetched
     * 
     * @return
     *      IUser | undefined that matches the provided id
     */
    public async findOneById(id: number): Promise<IUser | undefined> {
        try {
            console.log("Finding user by id...");
            const user: IUser | null = await User.findOne({ "userId": id }).exec();
            
            if (user === null) return undefined;

            console.log(user);
            return user;  
        } catch(Error) {
            console.log("ERROR ON findOneById");
            console.log(Error.message);
            return undefined;
        }
    } 

    /**
     * Method to fetch user by email
     * 
     * @param {string} email
     *      email of the user to be fetched
     * 
     * @return
     *      IUser | undefined that matches the provided email
     */
    public async findOneByEmail(email: string): Promise<IUser | undefined> {
        try {
            console.log("Finding user by email...");
            const user: IUser | null = await User.findOne({ "email": email }).exec();
            
            if (user === null) return undefined;
            
            console.log(user);
            return user;  
        } catch(Error) {
            console.log("ERROR ON findOneByEmail");
            console.log(Error.message);
            return undefined;
        }
    } 


    /**
     * Method to fetch user by username
     * 
     * @param {string} username
     *      Username of the user to be fetched
     * 
     * @return
     *      IUser | undefined that matches the provided username
     */
    public async findOneByUsername(username: string): Promise<IUser | undefined> {
        try {
            console.log("Finding user by username...");
            const user: IUser | null = await User.findOne({ "username": username }).exec();
            
            if (user === null) return undefined;
            
            console.log(user);
            return user;  
        } catch(Error) {
            console.log("ERROR ON findOneByUsername");
            console.log(Error.message);
            return undefined;
        }
    }

    /**
     * Method to create a user
     * 
     * @param {IUser} user
     *     IUser instance to be inserted in db
     * 
     * @return
     *      A boolean flag, if the creation was successfull or not
     */
    public async create(user: IUser): Promise<boolean> {
        try {
            console.log("Creating a document...");
            const newUser: IUser = await User.create(user);
        
            if (newUser === undefined) {
                console.log("Something went wrong on creation...");
                return false;
            }
            console.log("Successfully created user:");
            console.log(newUser);
            return true;
        } catch(Error) {
            console.log("ERROR ON findOneByUsername");
            console.log(Error.message);
            return false;
        }        
    }

    /**
     * Method to update a user entry
     * 
     * @param {number} id
     *      Id of the user to be deleted
     * @param {any} userData
     *      Data to be updated for a specific user entry
     * 
     * @return
     *      A boolean flag, if the update was successfull or not
     */
    public async update(id: number, userData: IUser): Promise<boolean> {
        try {
            console.log("Creating a document...");
            const user: IUser | null = await User.findOneAndUpdate({ "userId": id}, userData).exec();
            if (user === null) {
                console.log("No user found with id " + id);
                return false;
            }
            console.log("Successfully updated user:");
            console.log(user);
            return true;
        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return false;
        }
    }

    /**
     * Method to delete user entry
     * 
     * @param {number} id
     *      Id of the user to be deleted
     * 
     * @return
     *      A boolean flag, if deletion was successfull or not
     */
    public async delete(id: number): Promise<boolean> {
        try {
            const user: IUser | null = await User.findOneAndDelete({ "userId": id}).exec();
            if (user === null) {
                console.log("No user found with id " + id);
                return false;
            }
            console.log("Successfully deleted user:");
            console.log(user);
            return true;

        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return false;
        }
    }

}

export default UserRepository;
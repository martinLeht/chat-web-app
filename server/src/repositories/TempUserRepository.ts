import { injectable } from "inversify";
import ITempUserRepository from "./interfaces/ITempUserRepository";
import TempUser from "../models/TempUser";
import ITempUser from "../models/interfaces/ITempUser";

@injectable()
class TempUserRepository implements ITempUserRepository {
    
    /**
     * Method to fetch all users
     * 
     * @return
     *      ITempUser[] | undefined all users from db
     */
    public async findAll(): Promise<ITempUser[]> {
        try {
            console.log("Finding users...");
            const users: ITempUser[] = await TempUser.find().exec();
            
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
     * @param {string} id
     *      id of the user to be fetched
     * 
     * @return
     *      ITempUser | undefined that matches the provided id
     */
    public async findOneById(id: string): Promise<ITempUser | undefined> {
        try {
            console.log("Finding user by id...");
            const user: ITempUser | null = await TempUser.findOne({ "userId": id }).exec();
            
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
     * Method to fetch user by username
     * 
     * @param {string} username
     *      Username of the user to be fetched
     * 
     * @return
     *      ITempUser | undefined that matches the provided username
     */
    public async findOneByUsername(username: string): Promise<ITempUser | undefined> {
        try {
            console.log("Finding user by username...");
            const user: ITempUser | null = await TempUser.findOne({ "username": username }).exec();
            
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
     * @param {ITempUser} user
     *     ITempUser instance to be inserted in db
     * 
     * @return
     *      A boolean flag, if the creation was successfull or not
     */
    public async create(user: ITempUser): Promise<ITempUser | undefined> {
        try {
            console.log("Creating a document...");
            const newUser: ITempUser = await TempUser.create(user);
        
            if (newUser === undefined) {
                console.log("Something went wrong on creation...");
                return undefined;
            }
            console.log("Successfully created user:");
            console.log(newUser);
            return newUser;
        } catch(Error) {
            console.log("ERROR ON create");
            console.log(Error.message);
            return undefined;
        }        
    }

    /**
     * Method to update a user entry
     * 
     * @param {string} id
     *      Id of the user to be updated
     * @param {any} userData
     *      Data to be updated for a specific user entry
     * 
     * @return
     *      A boolean flag, if the update was successfull or not
     */
    public async update(id: string, userData: ITempUser): Promise<boolean> {
        try {
            console.log("Creating a document...");
            const user: ITempUser | null = await TempUser.findOneAndUpdate({ "userId": id}, userData).exec();
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
     * @param {string} id
     *      Id of the user to be deleted
     * 
     * @return
     *      A boolean flag, if deletion was successfull or not
     */
    public async delete(id: string): Promise<boolean> {
        try {
            const user: ITempUser | null = await TempUser.findOneAndDelete({ "userId": id}).exec();
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

export default TempUserRepository;
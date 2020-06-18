import { IReadWrite } from "./interfaces/IReadWrite";
import { Model, Document } from "mongoose";
import User from "../models/User";
import { IUser } from "../models/interfaces/IUser";

export default class UserRepository implements IReadWrite<IUser> {
    
    //we created constructor with arguments to manipulate mongodb operations
    constructor() {
        
    }
    
    async findAll(): Promise<IUser[] | undefined> {
        try {
            console.log("Finding users...");
            const users: IUser[] = await User.find().exec();
            
            if (users.length === 0) return undefined;

            console.log(users);
            return users;  
        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return undefined;
        }
    }

    async findOneById(id: number): Promise<IUser | undefined> {
        try {
            console.log("Finding user by id...");
            const user: IUser | null = await User.findOne({ "userId": id }).exec();
            
            if (user === null) return undefined;

            console.log(user);
            return user;  
        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return undefined;
        }
    } 

    async findOneByEmail(email: string): Promise<IUser | undefined> {
        try {
            console.log("Finding user by email...");
            const user: IUser | null = await User.findOne({ "email": email }).exec();
            
            if (user === null) return undefined;
            
            console.log(user);
            return user;  
        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return undefined;
        }
    } 

    async findOneByUsername(username: string): Promise<IUser | undefined> {
        try {
            console.log("Finding user by username...");
            const user: IUser | null = await User.findOne({ "username": username }).exec();
            
            if (user === null) return undefined;
            
            console.log(user);
            return user;  
        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return undefined;
        }
    }

    // we add to method, the async keyword to manipulate the insert result
    // of method.
    async create(user: IUser): Promise<boolean> {
        console.log("Creating a document...");
        const result: IUser = await User.create(user);
        
        if (result)
        console.log(result);
        return true;
    }

    async update(id: number, userData: any): Promise<boolean> {
        try {
            console.log("Creating a document...");
            const user: IUser | null = await User.findOne({ "userId": id}).exec();
        
            if (user === null) {
                console.log("No user found with id " + id);
                return false;
            }
            console.log("Found user:");
            console.log(user);
            userData.
            user.save();
            
            return true;
        } catch(Error) {
            console.log("ERROR ON CREATION");
            console.log(Error.message);
            return false;
        }
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
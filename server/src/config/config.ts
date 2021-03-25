import * as dotenv from 'dotenv';
import { DotenvConfigOutput } from 'dotenv';

let path = `${__dirname}/../../.env`;
const result: DotenvConfigOutput = dotenv.config({ path: path });
 
if (result.error) {
    throw result.error
}
export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
console.log(PORT);
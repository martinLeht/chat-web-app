import { Connection, connect, connection, disconnect } from "mongoose";

class MongoDbConnectionService {

    private static database: Connection;

    public static establishConnection(dbUri: string): Connection {
        connect(dbUri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        this.database = connection;
        return connection;
    }

    public static disconnect(): void {
        if (!this.database) {
            return;
        }
        disconnect();
    }
}

export default MongoDbConnectionService;

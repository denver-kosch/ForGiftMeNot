import { Sequelize, DataTypes } from "sequelize";
import {DB_USER, DB_PASS, DB_HOST, DB_PORT} from "./config.js";

export const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/forgiftmenot`, {logging: false});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await syncDB();
    } catch (error) {
        throw new Error('Unable to connect to the database: ' + error.message);
    }
};

export const syncDB = async () => {
    await sequelize.sync({
        alter: false,
        force: false,
    });
    console.log('Database synchronized.');
}


export const closeDB = async () => {
    await sequelize.close();
    console.log('Connection has been closed.');
};

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phoneNum: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    }, {
        timestamps: true,
    }
);

export const Gift = sequelize.define("Gift", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        },
    },
    }, {
        timestamps: true,
    }
);

export const List = sequelize.define('List', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
    }, {
        timestamps: true,
    }
);

export const ListGift = sequelize.define('ListGift', {}, {timestamps: true});

export const UserList = sequelize.define('UserList', {}, {timestamps: true,});

// User and Wishlist (through UserList)
User.belongsToMany(List, { through: UserList, foreignKey: 'user' });
List.belongsToMany(User, { through: UserList, foreignKey: 'list' });

UserList.belongsTo(User, { foreignKey: 'user' });
UserList.belongsTo(List, { foreignKey: 'list' });

// Wishlist and Gift (through ListGift)
List.belongsToMany(Gift, { through: ListGift, foreignKey: 'list' });
Gift.belongsToMany(List, { through: ListGift, foreignKey: 'gift' });

ListGift.belongsTo(List, { foreignKey: 'list' });
ListGift.belongsTo(Gift, { foreignKey: 'gift' });

// Wishlist and User direct relationship
List.belongsTo(User, { foreignKey: 'owner', onDelete: 'CASCADE' });
User.hasMany(List, { foreignKey: 'owner', onDelete: 'CASCADE' });
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
    lastname: {
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
        allowNull: false
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

export const Wishlist = sequelize.define('List', {
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

export const ListGift = sequelize.define('ListGift', {
    list: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Wishlist,
            key: 'id'
        },
        primaryKey: true
    },
    gift: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gift,
            key: 'id'
        },
        primaryKey: true
    },
    purchased: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    }, {
        timestamps: true,
    }
);

export const UserList = sequelize.define('UserList', {
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        primaryKey: true
    },
    list: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Wishlist,
            key: 'id'
        },
        primaryKey: true
    },
    }, {
        timestamps: true,
    }
);

// User and Wishlist (through UserList)
User.belongsToMany(Wishlist, { through: UserList });
Wishlist.belongsToMany(User, { through: UserList });

UserList.belongsTo(User, { foreignKey: 'user', onDelete: 'CASCADE' });
UserList.belongsTo(Wishlist, { foreignKey: 'list', onDelete: 'CASCADE' });

// Wishlist and Gift (through ListGift)
Wishlist.belongsToMany(Gift, { through: ListGift });
Gift.belongsToMany(Wishlist, { through: ListGift });

ListGift.belongsTo(Wishlist, { foreignKey: 'list', onDelete: 'CASCADE' });
ListGift.belongsTo(Gift, { foreignKey: 'gift', onDelete: 'CASCADE' });

Wishlist.hasMany(ListGift, { foreignKey: 'list', onDelete: 'CASCADE' });
Gift.hasMany(ListGift, { foreignKey: 'gift', onDelete: 'CASCADE' });

// Wishlist and User direct relationship
Wishlist.belongsTo(User, { foreignKey: 'owner', onDelete: 'CASCADE' });
User.hasMany(Wishlist, { foreignKey: 'owner', onDelete: 'CASCADE' });
import { Sequelize, DataTypes } from "sequelize";
import {DB_USER, DB_PASS, DB_HOST, DB_PORT} from "./config.js";

export const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/forgiftmenot`, {logging: false});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await syncDB();
        return [DB_HOST, DB_PORT, sequelize];
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
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
    }, {
        timestamps: true,
    }
);

export const ListGift = sequelize.define('ListGift', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    list: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Wishlist,
            key: 'id'
        }
    },
    gift: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gift,
            key: 'id'
        }
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

User.hasMany(Wishlist, { foreignKey: 'owner' });
Wishlist.belongsTo(User, { foreignKey: 'owner' });
Wishlist.hasMany(ListGift, { foreignKey: 'list' });
ListGift.belongsTo(Wishlist, { foreignKey: 'list' });
Wishlist.belongsToMany(Gift, { through: ListGift });
Gift.belongsToMany(Wishlist, { through: ListGift });

export const syncDB = async () => {
    await sequelize.sync();
    console.log('Database synchronized.');
}


import os from 'os';
import path from 'path';
import {
	INTEGER,
	Sequelize,
	STRING,
	// ray test touch <
	BOOLEAN
	// ray test touch >
} from 'sequelize';

import { User } from './models';

const sequelize = new Sequelize('login-with-metamask-database', '', undefined, {
	dialect: 'sqlite',
	// ray test touch <
	storage: path.join(os.tmpdir(), 'database.sqlite'),
	// ray test touch >
	logging: false
});

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
			defaultValue: (): number => Math.floor(Math.random() * 10000) // Initialize with a random nonce
		},
		publicAddress: {
			allowNull: false,
			type: STRING,
			unique: true,
			// To make it simple, I set the publicAddress field as lowercase. A more rigorous implementation would add a validation function to check that all addresses here are https://ethereum.stackexchange.com/questions/1374/how-can-i-check-if-an-ethereum-address-is-valid
			validate: { isLowercase: true }
		},
		username: {
			type: STRING,
			unique: true
		},
		// ray test touch <
		premium: {
			type: BOOLEAN,
			unique: false,
			defaultValue: false
		}
		// ray test touch >
	},
	{
		modelName: 'user',
		sequelize, // This bit is important
		timestamps: false
	}
);

// Create new tables
sequelize.sync();

export { sequelize };


import { Model } from 'sequelize';

export class User extends Model {
	public id!: number; // Note that the `null assertion` `!` is required in strict mode
	public nonce!: number;
	public publicAddress!: string;
	public username?: string; // For nullable fields
	// ray test touch <
	public premium?: boolean;
	// ray test touch >
}

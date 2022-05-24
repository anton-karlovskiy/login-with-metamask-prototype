
/**
 * JWT config.
 */
const JWT_SETTING = {
	algorithms: ['HS256' as const],
	secret: 'shhhh', // TODO: put in process.env
};

const SIGN_MESSAGE_PREFIX = 'I am signing my one-time nonce: ';

export {
	JWT_SETTING,
	SIGN_MESSAGE_PREFIX
};

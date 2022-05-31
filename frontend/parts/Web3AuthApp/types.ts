
interface Auth {
  accessToken: string;
}

interface JwtDecoded {
  payload: {
    id: string;
    publicAddress: string;
  };
}

export type {
  Auth,
  JwtDecoded
};

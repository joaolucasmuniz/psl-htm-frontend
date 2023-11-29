export type CardProps = {
  id: number,
  name: string,
};

export type TClientDetails = {
  id: number,
  access_level: number,
  address: string,
  email: string,
  name: string,
  phone: string,
  postalcode: string,
};

export type TCreateClient = {
  accessLevel: number,
  address: string,
  email: string,
  name: string,
  phone: string,
  postalcode: string,
};

export type TUser = {
  id : number,
  username: string,
  access_level: number,
};

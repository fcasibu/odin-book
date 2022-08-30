import jwt from "jsonwebtoken";

export const signToken = (id: string, options?: jwt.SignOptions) => {
  return jwt.sign({ id }, process.env.SECRET_KEY as string, options);
};

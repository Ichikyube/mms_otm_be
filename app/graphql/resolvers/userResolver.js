import { User } from "../models";
import UserType from "../types/userType.js";

const userResolver = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLString } },
    resolve(parent, args) {
      return User.findByPk(args.id);
    },
  },
  // Add other CRUD operations for users here
};

export default userResolver;

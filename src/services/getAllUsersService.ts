import { client } from "../prisma/client";

class GetAllUsersService {
  async execute() {
    const users = client.users.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        xp: true,
        created_at: true,
      },
    });

    if (!users) {
      throw new Error("Not even a single user has been found!");
    }

    return users;
  }
}

export { GetAllUsersService };

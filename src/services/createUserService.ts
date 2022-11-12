import { hash } from "bcrypt";
import { client } from "../prisma/client";

interface IRequestCreateUser {
  name: string;
  email: string;
  password: string;
  picture: string;
}

class CreateUserService {
  async execute({ name, email, password, picture }: IRequestCreateUser) {
    const userAlreadyExists = await client.users.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await client.users.create({
      data: {
        name,
        email,
        password: passwordHash,
        picture,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
    };
  }
}

export { CreateUserService };

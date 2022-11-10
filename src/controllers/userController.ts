import { Request, Response } from "express";
import { AuthenticatedUserService } from "../services/authenticatedUserService";
import { CreateUserService } from "../services/createUserService";
import { GetUniqueUserService } from "../services/getUniqueUserService";
import { GetAllUsersService } from "../services/getAllUsersService";

const authenticatedUserService = new AuthenticatedUserService();
const createUserService = new CreateUserService();
const getUniqueUserService = new GetUniqueUserService();
const getAllUsersService = new GetAllUsersService();

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await createUserService.execute({ name, email, password });

    return res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const message = await authenticatedUserService.execute({ email, password });

    return res.json(message);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await getUniqueUserService.execute(id);

    return res.json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await getAllUsersService.execute();

    return res.json(users);
  }
}

export { UserController };

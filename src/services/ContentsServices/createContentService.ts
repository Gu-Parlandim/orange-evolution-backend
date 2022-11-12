import { client } from "../../prisma/client";

interface IRequestCreateContent {
  title: string;
  description: string;
  link: string;
  type: string;
  trail_id: number;
  category_id: number;
}

class CreateContentService {
  async execute({
    description,
    link,
    title,
    type,
    trail_id,
    category_id,
  }: IRequestCreateContent) {
    const content = await client.contents.create({
      data: {
        description,
        link,
        title,
        type,
        trail_id,
        category_id,
      },
    });

    return content;
  }
}

export { CreateContentService };

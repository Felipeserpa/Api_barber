import prismaClient from "../../prisma";

interface UpdateUserRequest {
  user_id: string;
  name: string;
  endereco: string;
}
export class UpdateUserService {
  async execute({ user_id, name, endereco }: UpdateUserRequest) {
    if (!user_id) {
      throw new Error("User ID is missing");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User not exists");
    }

    const userUpdated = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        endereco,
      },
      select: {
        name: true,
        endereco: true,
        email: true,
      },
    });

    return userUpdated;
  }
}

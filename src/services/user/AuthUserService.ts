import prismaClient from "../../prisma";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      include: {
        subscripitons: true,
      },
    });
    if (!user) {
      throw new Error("User/Email incorrect");
    }
    //vericar se a senha ta correta.
    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      throw new Error("User/Email incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );
    return {
      id: user?.id,
      name: user.name,
      email: user.email,
      token: token,
      subscriptions: user?.subscripitons
        ? {
            id: user?.subscripitons?.id,
            status: user?.subscripitons?.status,
          }
        : null,
    };
  }
}

export { AuthUserService };
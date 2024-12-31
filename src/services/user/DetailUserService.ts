import prismaClient from "../../prisma";

class UserDetailService {
  static execute() {
    throw new Error("Method not implemented.");
  }
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
    return users;
  }
}
export { UserDetailService };

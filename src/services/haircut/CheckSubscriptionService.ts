import prismaClient from "../../prisma";

interface CheckSubscription {
  user_id: string;
}
export class CheckSubscriptionService {
  async execute({ user_id }: CheckSubscription) {
    const status = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        subscripitons: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    if (!status) {
      throw new Error("User does not have an active subscription");
    }

    return status;
  }
}

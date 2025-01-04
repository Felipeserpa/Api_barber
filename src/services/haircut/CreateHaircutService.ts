import prismaClient from "../../prisma";

interface HaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

//verificar se ele e premium se nao limitamos a quantidade de modelos para cadastrar

export class CreateHaircutService {
  async execute({ name, price, user_id }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Missing required fields");
    }

    //erificar quantos modelos esse usuario ja tem cadastro
    const myHaircuts = await prismaClient.haircut.count({
      where: {
        user_id: user_id,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscripitons: true,
      },
    });

    //cria a  validadcao ou limites
    if (myHaircuts >= 3 && user?.subscripitons?.status !== "active") {
      throw new Error("Not authorized ");
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        name,
        price,

        user_id,
      },
    });

    return haircut;
  }
}

import prismaClient from "../prisma";

class GetUserProfileService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                name: true,
                avatar_url: true,
            },
        });

        return user;       
    }
}

export { GetUserProfileService };
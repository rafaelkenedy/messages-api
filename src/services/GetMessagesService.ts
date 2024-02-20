import prismaClient from "../prisma";

class GetMessagesService {
    async execute(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [messages, total] = await prismaClient.$transaction([
            prismaClient.message.findMany({
                skip,
                take: limit,
            }),
            prismaClient.message.count(),
        ]);

        const totalPages = Math.ceil(total / limit);
        const hasMore = page < totalPages;

        return {
            data: messages,
            total,
            totalPages,
            hasMore,
        };
    }
}

export { GetMessagesService }
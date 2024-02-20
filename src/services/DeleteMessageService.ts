import prismaClient from "../prisma";
import { io } from "../app";

class DeleteMessageService {
    async execute(message_id: string, user_id: string) {        
        const message = await prismaClient.message.findUnique({
            where: {
                id: message_id,
            },
        });
        
        if (!message) {
            throw new Error("Message not found");
        }        
        if (message.user_id !== user_id) {
            throw new Error("You don't have permission to delete this message");
        }        
        await prismaClient.message.delete({
            where: {
                id: message_id,
            },
        });        
        io.emit("deleted_message", { message_id });        
        return { message_id: message_id, message: "Message deleted successfully" };
    }
}

export { DeleteMessageService };
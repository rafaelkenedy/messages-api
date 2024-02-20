import prismaClient from "../prisma";
import { io } from "../app";

class UpdateMessageService {
    async execute(message_id: string, text: string, user_id: string) {
        
        const message = await prismaClient.message.findUnique({
            where: {
                id: message_id,
            },
        });

        if (!message) {
            throw new Error("Message not found");
        }
        if (message.user_id !== user_id) {
            throw new Error("You don't have permission to update this message");
        }  
        
        const updatedMessage = await prismaClient.message.update({
            where: {
                id: message_id,
            },
            data: {
                text,
            },
            include: {
                user: true,
            },
        });
        
        const infoWS = {
            id: updatedMessage.id,
            text: updatedMessage.text,
            user_id: updatedMessage.user_id,
            created_at: updatedMessage.created_at,
            user: {
                name: updatedMessage.user.name,
                avatar_url: updatedMessage.user.avatar_url,
            },
        };
        
        io.emit("updated_message", infoWS);

        return updatedMessage;
    }
}

export { UpdateMessageService };

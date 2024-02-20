import { Request, Response } from "express";
import { UpdateMessageService } from "../services/UpdateMessageService";

class UpdateMessageController {
    async handle(req: Request, res: Response){      

        const { id: message_id } = req.params;        
        const { message } = req.body;                
        const { user_id } = req;

        const service = new UpdateMessageService();

        try {
            const result = await service.execute(message_id, message, user_id);
            return res.json(result);
        } catch (err) {            
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            } else {                
                return res.status(400).json({ message: "An unexpected error occurred" });
            }
        }
    }
};

export { UpdateMessageController };

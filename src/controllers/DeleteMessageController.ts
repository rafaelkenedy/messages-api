import { Request, Response } from "express";
import { DeleteMessageService } from "../services/DeleteMessageService";

class DeleteMessageController {
    async handle(req: Request, res: Response){
        
        const { id: message_id } = req.params; 
        
        const { user_id } = req;

        const service = new DeleteMessageService();

        try {
            const result = await service.execute(message_id, user_id);
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

export { DeleteMessageController };

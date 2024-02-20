import { Request, Response } from "express";
import { GetMessagesService } from "../services/GetMessagesService";

class GetMessagesController {
    async handle(req: Request, res: Response) {        
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const service = new GetMessagesService();        
        
        const result = await service.execute(page, limit);

        return res.json(result);
    }
}

export { GetMessagesController };

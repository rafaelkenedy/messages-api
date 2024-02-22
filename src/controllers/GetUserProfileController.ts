import { Request, Response } from "express";
import { GetUserProfileService } from "../services/GetUserProfileService";

class GetUserProfileController {
    async handle(req: Request, res: Response) {        
        const { userId } = req.params;
        const service = new GetUserProfileService();
        const result = await service.execute(userId);        
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(result);
    }
}

export { GetUserProfileController };

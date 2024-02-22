import { Router } from "express";import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { UpdateMessageController }from "./controllers/UpdateMessageController";
import { GetMessagesController } from "./controllers/GetMessagesController";
import { DeleteMessageController } from "./controllers/DeleteMessageController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { GetUserProfileController } from "./controllers/GetUserProfileController";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/messages", new GetMessagesController().handle);

router.delete('/messages/:id', ensureAuthenticated, new DeleteMessageController().handle);

router.put('/messages/:id', ensureAuthenticated, new UpdateMessageController().handle);

router.get("/profile/internal", ensureAuthenticated, new ProfileUserController().handle);

router.get("/profile/:userId", new GetUserProfileController().handle);

export { router };
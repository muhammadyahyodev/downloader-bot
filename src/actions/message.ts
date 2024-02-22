import { messageController } from '../controllers/message';
import { bot } from '../core/bot';

bot.on("message", messageController);
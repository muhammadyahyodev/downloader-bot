import { bot } from '../core/bot';
import { startController } from '../controllers/index';

bot.command('start', startController);
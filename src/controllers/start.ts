import { Context } from "grammy";

const startController = async (ctx: Context) => {
    ctx.reply(`Welcome <b>${ctx.message?.from.first_name}</b>, send me link the video`, {
        parse_mode: "HTML",
    });
}

export { startController };
import { Context } from "grammy";
import axios from 'axios';

const checkValidation = (url: string) => {
    const regex = 
    /^https:\/\/(?:www\.)?instagram\.com\/reel\/[a-zA-Z0-9_-]+\/\?igsh=[a-zA-Z0-9_-]+$/;
    return regex.test(url)
}

const downloadInstagramReel = async (url: string, ctx: Context) => {
    const options = {
        method: 'GET',
        url: process.env.API_URL,
        params: {
            url,
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST,
        }
    };

    try {
        const response = await axios.request(options);
        await ctx.replyWithVideo(response.data.media, {
            caption: `${response.data.title}\n\nDownloaded via @imyakhyo`,
        })
    } catch (error) {
        console.error(error);
        ctx.reply(`Sorry, couldn't download the video`);
    }
}

const messageController = async (ctx: Context) => {
    const message = ctx.message?.text as string;
    const isValid = await checkValidation(message);
    if (isValid) {
        await ctx.reply('We are processing your request, please wait...');
        await ctx.replyWithChatAction('upload_video');
        await downloadInstagramReel(message, ctx);
    } else {
        await ctx.reply("Send a valid url");
    }
}

export { messageController };
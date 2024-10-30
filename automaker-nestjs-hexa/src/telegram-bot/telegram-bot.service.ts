import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class TelegramBotService {
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Bienvenido al Servicio de Ayuda de AutoMaker');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('¿En qué puedo ayudarte?');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  // Detecta "hi" en cualquier combinación de mayúsculas o minúsculas
  @Hears(/^hi$/i)
  async hearsHi(ctx: Context) {
    await ctx.reply('¡Hola! ¿Qué tal?');
  }

  // Detecta "feo" en cualquier combinación de mayúsculas o minúsculas
  @Hears(/^feo$/i)
  async hearsUgly(ctx: Context) {
    await ctx.reply('¡No digas eso! 😅');
  }
}

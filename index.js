import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { handlePlayCommand } from './commands/play.js';
import { handleHelpCommand } from './commands/help.js';
import { handlePingCommand } from './commands/ping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = pino({ level: config.logLevel });

const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_multi');
  
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['AMJUU', 'Safari', '1.0.0']
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if ((lastDisconnect?.error?.output?.statusCode) !== DisconnectReason.loggedOut) {
        startBot();
      }
    } else if (connection === 'open') {
      logger.info('✅ Bot Connected! Ready to use...');
      console.log('\n🎵 AMJUU Bot is Online!\n');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (m) => {
    try {
      if (!m.messages) return;
      
      const message = m.messages[0];
      if (!message.message) return;
      if (message.key.fromMe) return;

      const text = message.message.conversation || message.message.extendedTextMessage?.text || '';
      const sender = message.key.remoteJid;
      const isGroup = sender?.endsWith('@g.us');
      const isOwner = sender === `${config.ownerNumber}@s.whatsapp.net`;

      if (!text.startsWith(config.prefix)) return;

      const args = text.slice(config.prefix.length).trim().split(/ +/);
      const cmd = args.shift()?.toLowerCase();

      logger.info(`Command: ${cmd} | From: ${sender} | Text: ${text}`);

      // Command Handler
      if (cmd === 'play') {
        await handlePlayCommand(sock, message, args, sender, isGroup);
      } else if (cmd === 'help') {
        await handleHelpCommand(sock, sender);
      } else if (cmd === 'ping') {
        await handlePingCommand(sock, sender);
      } else {
        await sock.sendMessage(sender, { text: `❌ Unknown command: ${cmd}\nUse ${config.prefix}help for available commands` });
      }
    } catch (error) {
      logger.error('Error processing message:', error);
    }
  });
};

startBot().catch(err => logger.error('Fatal error:', err));

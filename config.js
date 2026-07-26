import dotenv from 'dotenv';
dotenv.config();

export const config = {
  prefix: process.env.BOT_PREFIX || '.',
  botName: process.env.BOT_NAME || 'AMJUU',
  ownerNumber: process.env.OWNER_NUMBER || '03022718068',
  ownerName: process.env.OWNER_NAME || 'Amju',
  autoStatusSeen: process.env.AUTO_STATUS_SEEN === 'true',
  autoReply: process.env.AUTO_REPLY === 'true',
  groupOnly: process.env.GROUP_ONLY === 'true',
  privateOnly: process.env.PRIVATE_ONLY === 'true',
  logLevel: process.env.LOG_LEVEL || 'info'
};

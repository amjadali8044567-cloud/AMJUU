import { config } from '../config.js';

export const handleHelpCommand = async (sock, sender) => {
  const helpText = `
╔════════════════════════════════╗
║   🎵 AMJUU Bot - Help Menu 🎵   ║
╚════════════════════════════════╝

📋 Available Commands:

1️⃣  .play [song_name]
   └─ Download and play songs
   └─ Example: .play BTS Dynamite

2️⃣  .help
   └─ Show this help menu

3️⃣  .ping
   └─ Check bot response time

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 Bot Info:
• Name: ${config.botName}
• Owner: ${config.ownerName}
• Prefix: ${config.prefix}

✨ Features:
✅ Download songs from YouTube
✅ Works in groups and private chats
✅ Fast response time
✅ Easy to use commands

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 Need help? Contact owner!

Made with ❤️ by AMJUU
`;

  await sock.sendMessage(sender, { text: helpText });
};

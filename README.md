# 🎵 AMJUU - WhatsApp Music Bot

A powerful WhatsApp bot built with Baileys that allows you to download and share songs, with command support for groups and personal chats.

## ✨ Features

- 🎵 **Song Download**: Download songs directly from YouTube using `.play` command
- 🤖 **Command System**: Easy-to-use command prefix system
- 👥 **Group Support**: Works in groups and personal chats
- 🔧 **Extensible**: Easy to add new commands and features
- ⚡ **Fast & Reliable**: Built with Baileys for stable WhatsApp connection
- 📱 **Owner Controls**: Special features for bot owner

## 🎯 Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `.play` | Download and play songs from YouTube | `.play song_name` |
| `.ping` | Check bot response time | `.ping` |
| `.help` | Show all available commands | `.help` |

## 📋 Requirements

- Node.js v14 or higher
- npm or yarn
- WhatsApp account
- FFmpeg (for audio processing)
- yt-dlp (YouTube downloader)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/amjadali8044567-cloud/amjuu.git
cd amjuu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install yt-dlp (for song download)

**On Windows:**
```bash
pip install yt-dlp
```

**On macOS:**
```bash
brew install yt-dlp
```

**On Linux:**
```bash
sudo apt-get install yt-dlp
```

### 4. Configure environment
```bash
cp .env.example .env
```

Edit `.env` file and update:
```
BOT_PREFIX=.
BOT_NAME=AMJUU
OWNER_NUMBER=03022718068
OWNER_NAME=Amju
AUTO_STATUS_SEEN=true
```

### 5. Start the bot
```bash
npm start
```

The bot will generate a QR code. Scan it with your WhatsApp to authenticate.

## 📱 How to Use

### In Personal Chat
1. Send `.play BTS Dynamite` to bot
2. Bot will download and send the song
3. Enjoy! 🎵

### In Group Chat
1. Add bot to your group
2. Use `.play song_name` command
3. Bot will download and share in group

### Get Help
Send `.help` to see all available commands

## 🔧 Configuration

Edit `.env` file to customize:
- **BOT_PREFIX**: Command prefix (default: `.`)
- **BOT_NAME**: Bot name (default: `AMJUU`)
- **OWNER_NUMBER**: Bot owner WhatsApp number
- **OWNER_NAME**: Bot owner name
- **AUTO_STATUS_SEEN**: Auto view status (true/false)
- **AUTO_REPLY**: Auto reply to messages (true/false)

## 📁 Project Structure

```
amjuu/
├── index.js                 # Main bot file
├── config.js               # Configuration
├── package.json            # Dependencies
├── .env                    # Environment variables
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── commands/               # Command handlers
│   ├── play.js            # Music command
│   ├── ping.js            # Ping command
│   └── help.js            # Help command
└── downloads/              # Downloaded songs (auto-created)
```

## 🎨 Adding Custom Commands

1. Create a new file in `commands/` directory:

```javascript
// commands/mycommand.js
export const handleMyCommand = async (sock, message, args, sender, isGroup) => {
  await sock.sendMessage(sender, { 
    text: 'Your response here' 
  });
};
```

2. Import and add to `index.js`:

```javascript
import { handleMyCommand } from './commands/mycommand.js';

// In message handler
if (cmd === 'mycommand') {
  await handleMyCommand(sock, message, args, sender, isGroup);
}
```

## ⚙️ Advanced Features

### Auto Status Viewing
Enable in `.env`: `AUTO_STATUS_SEEN=true`

### Auto Reply
Enable in `.env`: `AUTO_REPLY=true`

## 🐛 Troubleshooting

### Bot not responding?
- Check if WhatsApp session is active
- Scan QR code again
- Ensure correct prefix is used
- Check internet connection

### Song download fails?
- Check internet connection
- Verify yt-dlp is installed: `yt-dlp --version`
- Try different song name
- Check YouTube accessibility

### QR Code not showing?
- Update terminal to support colors
- Check Node.js version (must be v14+)
- Try: `npm install -g @whiskeysockets/baileys`

### Module not found errors?
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## ⚠️ Important Notes

- Keep your `.env` file private - don't share it
- Don't share session credentials
- Use responsibly and respect music copyright
- Bot owner gets full access to all features
- The bot uses your WhatsApp account - keep it secure

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

## 📜 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👤 Bot Owner

**Name:** Amju  
**Number:** 03022718068

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section
2. Create an issue on GitHub
3. Contact the bot owner

## 🔗 Links

- [GitHub Repository](https://github.com/amjadali8044567-cloud/amjuu)
- [WhatsApp](https://wa.me/03022718058)

---

**Made with ❤️ for WhatsApp Music Lovers**

*Version 1.0.0*

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const searchYoutube = async (query) => {
  try {
    const response = await axios.get('https://www.youtube.com/results', {
      params: { search_query: query },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    // Extract video ID from response
    const match = response.data.match(/"videoId":"([^"]+)"/);
    if (match) {
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
    return null;
  } catch (error) {
    console.error('YouTube search error:', error);
    return null;
  }
};

const downloadSong = async (videoUrl, songName) => {
  const downloadsDir = path.join(__dirname, '../downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  const outputPath = path.join(downloadsDir, `${songName}.mp3`);
  
  try {
    // Using yt-dlp command
    await execPromise(
      `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${videoUrl}"`
    );
    return outputPath;
  } catch (error) {
    console.error('Download error:', error);
    return null;
  }
};

export const handlePlayCommand = async (sock, message, args, sender, isGroup) => {
  if (args.length === 0) {
    return sock.sendMessage(sender, { 
      text: '🎵 Usage: .play song_name\n\nExample: .play BTS Dynamite' 
    });
  }

  const songQuery = args.join(' ');
  
  try {
    // Send searching message
    await sock.sendMessage(sender, { 
      text: `🔍 Searching for: ${songQuery}...` 
    });

    // Search YouTube
    const videoUrl = await searchYoutube(songQuery);
    
    if (!videoUrl) {
      return sock.sendMessage(sender, { 
        text: `❌ Could not find: ${songQuery}` 
      });
    }

    // Send downloading message
    await sock.sendMessage(sender, { 
      text: `⬇️ Downloading: ${songQuery}...` 
    });

    // Download song
    const audioPath = await downloadSong(videoUrl, songQuery.replace(/\s+/g, '_'));

    if (!audioPath || !fs.existsSync(audioPath)) {
      return sock.sendMessage(sender, { 
        text: `❌ Failed to download: ${songQuery}` 
      });
    }

    // Send audio file
    const fileSize = fs.statSync(audioPath).size;
    
    if (fileSize > 100 * 1024 * 1024) { // 100MB limit
      fs.unlinkSync(audioPath);
      return sock.sendMessage(sender, { 
        text: '❌ File too large (Max: 100MB)' 
      });
    }

    await sock.sendMessage(sender, {
      audio: fs.readFileSync(audioPath),
      mimetype: 'audio/mpeg',
      fileName: `${songQuery}.mp3`
    });

    // Clean up after sending
    setTimeout(() => {
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
    }, 5000);

    await sock.sendMessage(sender, { 
      text: `✅ Sent: ${songQuery}\n🎵 Enjoy!` 
    });

  } catch (error) {
    console.error('Play command error:', error);
    await sock.sendMessage(sender, { 
      text: `❌ Error: ${error.message}` 
    });
  }
};

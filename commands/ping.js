export const handlePingCommand = async (sock, sender) => {
  const start = Date.now();
  
  const msg = await sock.sendMessage(sender, { 
    text: '🏓 Pong!' 
  });
  
  const end = Date.now();
  const latency = end - start;

  await sock.sendMessage(sender, { 
    text: `⚡ Pong! Response time: ${latency}ms` 
  });
};

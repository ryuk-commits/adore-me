export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { user, topic, msg } = req.body;

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "📩 New Website Query",
          color: 10587345,
          fields: [
            { name: "User", value: user, inline: true },
            { name: "Topic", value: topic, inline: true },
            { name: "Message", value: msg }
          ],
          footer: { text: "Sent from /adoreme website" },
          timestamp: new Date()
        }]
      })
    });

    if (!response.ok) {
      throw new Error("Failed to send to Discord");
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

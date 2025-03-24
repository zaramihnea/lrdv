// netlify/functions/serverTime.js
exports.handler = async function() {
    try {
      // Get current time in Romania (Bucharest timezone)
      const now = new Date();
      
      // Format options for Romania timezone
      const options = { timeZone: 'Europe/Bucharest' };
      const bucharestTimeStr = now.toLocaleString('en-US', options);
      const bucharestTime = new Date(bucharestTimeStr);
      
      return {
        statusCode: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          datetime: bucharestTime.toISOString(),
          timestamp: bucharestTime.getTime()
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to get server time" })
      };
    }
  }
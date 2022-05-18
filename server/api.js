const axios = require("axios");

async function trackParser(number, courier=null) { 
  const response = await axios.get(`https://www.tracking.my/${courier || "track"}/${number}`);
  const data = response.data;
  try {
    const requestData = JSON.parse(data
      .replace(/\s/g, '')
      .match(/api\/tracking.*?data:(.*?})/)[1]
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));

    const finalResponse = await axios(
      {
        method: "POST",
        url: "https://www.tracking.my/api/tracking",
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
          "origin": "https://www.tracking.my",
          "x-requested-with": "XMLHttpRequest"
        }
      }
    );
    if (finalResponse.data.lasest_status !== "pending" && finalResponse.data.result.length) {
      return {
        status: "success",
        data: finalResponse.data
      };
    } else {
      return {
        status: "error",
        message: "Not found"
      }
    }
  } catch (error) {
    if (!courier) {
      return {
        status: "multiple",
        data: data
          .replace(/\s{2,}/g, '')
          .match(/<div class="courier-item">.*?<\/div>(?=.+None of them)/g)
          .map(e => e.match(/href="(.*?)"/)[1])
      }
    } else {
      return {
        status: "error",
        data: "Not found"
      }
    }
  }
}

module.exports = { trackParser };
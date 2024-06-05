export async function fetchDataFromWorker() {
    try {
      const response = await fetch("https://api.roxcelic.love/");
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        console.error("Error fetching data from Cloudflare Worker:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  }
export async function getalbum(input, artist) {
    try {
      const response = await fetch("https://api.roxcelic.love/?input=" + input + "&artist=" + artist);
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
import axios from "axios";

// const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const URL = "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary";

export const getLocationInfo = async (sw, ne) => {
  try {
    // Axios GET request to the specified URL
    const {
      data: { data },
    } = await axios.get(URL, {
      // Parameters for the request based on the southwest (sw) and northeast (ne) coordinates
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      // Headers required for the RapidAPI
      headers: {
        // "X-RapidAPI-Key": "2ab628a7dbmsh88141b9189ac50ep1ab59djsnf3d3f0edcea2",
        // "X-RapidAPI-Key": "fb41c859abmsh03d12c836639d57p1a7162jsn7016c860d8e5",
        "X-RapidAPI-Key": "79b18cdd64mshc48a1489db92148p112563jsnaf58921f97e1",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    // Return the data from the response
    return data;
  } catch (e) {
    // Log any errors that occur during the request
    console.log(e);
  }
};

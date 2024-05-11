import React from "react";
import { useState } from "react";
import axios from "axios";

const RouteRecommendation = () => {
  const [places, setPlaces] = useState({
    place1: "",
    place2: "",
    place3: "",
    place4: "",
    place5: "",
    place6: "",
    days: "",
  });
  const [recommendation, setRecommendation] = useState("");

  const processText = (text) => {
    if (!text) {
      return;
    }

    let newText = text.replace(/\*\*(.*?)\*\*/gs, "<b>$1</b></br>"); // Replace **text** with <b>text</b>
    newText = newText.replace(/^\*(.*)$/gm, "<br>$1"); // Replace * at the start of a line with <br>
    newText = newText.replace(/Key Concepts in/g, ""); // Remove "Key Concepts in"
    newText = newText.replace(/Key Concepts for/g, ""); // Remove "Key Concepts in"
    newText = newText.replace(/-/g, "<br>"); // Replace - with <br>

    return newText;
  };

  const getRoute = async (e) => {
    e.preventDefault();
    console.log({ places });

    try {
      const prompt = `I need to travel these among cities ${places.place1},${places.place2},${places.place3},${places.place4},${places.place5}, ${places.place6} in sri lanka. I plan to stay ${places.days} days in sri lanka. Give me the optimal route and give me the order how i should travel day by day. And show the root by arrows`;
      const response = await axios.post(
        "http://localhost:8000/api/generateRoute",
        {
          message: prompt,
        }
      );
      console.log(response);
      const text = processText(response.data.text);
      console.log(text);
      setRecommendation(text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto ">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Route Recommendation
      </h1>
      <form onSubmit={getRoute} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your starting location"
          value={places.place1}
          onChange={(e) => setPlaces({ ...places, place1: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter your second location"
          value={places.place2}
          onChange={(e) => setPlaces({ ...places, place2: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter your third location"
          value={places.place3}
          onChange={(e) => setPlaces({ ...places, place3: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter your fourth location"
          value={places.place4}
          onChange={(e) => setPlaces({ ...places, place4: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter your fifth location"
          value={places.place5}
          onChange={(e) => setPlaces({ ...places, place5: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter your sixth location"
          value={places.place6}
          onChange={(e) => setPlaces({ ...places, place6: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <h4 className="text-white">How many days?</h4>
        <input
          type="text"
          placeholder="Enter number of days you have"
          value={places.days}
          onChange={(e) => setPlaces({ ...places, days: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-white text-black rounded border hover:bg-black-1000"
        >
          Get Recommendation
        </button>
      </form>
      <div className="flex flex-col items-start w-3xl justify-center text-yellow-100 px-4 py-2 flex-grow bg-blue-900 rounded shadow-lg mt-4 p-4"
     dangerouslySetInnerHTML={{ __html: recommendation }}
/>
    </div>
  );
};

export default RouteRecommendation;

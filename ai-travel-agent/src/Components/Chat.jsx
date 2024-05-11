import { useState } from "react";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";

const Chat = () => {
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false); // Add this line


  // const processText = (text) => {
  //   let newText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Replace **text** with <b>text</b>
  //   newText = newText.replace(/\*(.*?)\*/g, '<br>$1'); // Replace *text* with <br>text
  //   return newText;
  // };

  const processText = (text) => {

    if(!value){
      return;
    }
    
    let newText = text.replace(/\*\*(.*?)\*\*/gs, "<b>$1</b>"); // Replace **text** with <b>text</b>
    newText = newText.replace(/^\*(.*)$/gm, "<br>$1"); // Replace * at the start of a line with <br>
    newText = newText.replace(/Key Concepts in/g, ""); // Remove "Key Concepts in"
    newText = newText.replace(/-/g, "<br>"); // Replace - with <br>


    return newText;
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please enter a prompt");
      return;
    }
    setLoading(true); // Set loading to true when the request starts

    try {
      const prompt = `Provide a bulleted list of key concepts in ${value}`;
      const response = await axios.post("http://localhost:8000/api/generate", {
        history: chatHistory,
        message: prompt,
      });
      console.log(response);

      const data = response.data.text;

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: processText(value),
        },
        {
          role: "model",
          parts: processText(data),
        },
      ]);
      setValue("");
      console.log(data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong, Please try again");
    }
    setLoading(false); // Set loading to false when the request is finished

  };

  return (
    <div style={{paddingBottom: 100}} className="bg-zinc-900 pt-3 overflow-hidden h-screen flex flex-col justify-between">
      <div className="overflow-y-auto px-4 py-2 flex-grow">
        {chatHistory.map((chatItem, index) => (
          <div key={index} className="mb-4">
            {/* <p className={`py-2 px-4 rounded-lg ${chatItem.role === 'user' ? 'bg-blue-900 text-white' : 'bg-white text-gray-800'}`}
               dangerouslySetInnerHTML={{ __html: `<span classname="">${chatItem.role}:</span> ${chatItem.parts}` }}>
            </p> */}
            {/* <p className={`py-2 px-4 rounded-lg ${chatItem.role === 'user' ? 'bg-blue-900 text-white' : 'bg-white text-gray-800'}`}
   dangerouslySetInnerHTML={{ __html: `<span classname="">${chatItem.role === 'user' ? 'You' : (chatItem.role === 'model' ? 'Guide' : chatItem.role)}:</span> ${chatItem.parts}` }}>
</p> */}
            <p
              className={`py-2 px-4 rounded-lg ${
                chatItem.role === "user"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-800"
              }`}
              dangerouslySetInnerHTML={{
                __html: `<span classname=""><b>${
                  chatItem.role === "user"
                    ? "You"
                    : chatItem.role === "model"
                    ? "Guide"
                    : chatItem.role
                }</b>:</span> ${chatItem.parts}`,
              }}
            ></p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-left py-2 px-2 rounded-lg bg-gray-300 w-[500px]">
          <input
            className="block mx-4 p-2.5 w-full text-sm text-white bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[1500px]"
            placeholder="Your message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>

        { loading ? 
        (<div><LuLoader2 /></div>)
        :
        (
        <button
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            title="Submit message"
            onClick={getResponse}
          >
            <svg
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>                
        ) 
          }
        </div>
      </div>
    </div>
  );
};

export default Chat;

// import { useState } from "react";
// import axios from "axios";

// const Chat = () => {

//   const [error, setError] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [value, setValue] = useState("");

//   const getResponse = async () => {
//     if (!value) {
//       setError("Please enter a prompt");
//       return;
//     }
//     try {
//       const prompt = `Provide a bulleted list of key concepts in ${value}`;
//       const response = await axios.post("http://localhost:8000/api/generate", {
//         history: chatHistory,
//         message: prompt,
//       });
//       console.log(response);

//       const data = response.data.text;
//       setChatHistory((oldChatHistory) => [
//         ...oldChatHistory,
//         {
//           role: "user",
//           parts: value,
//         },
//         {
//           role: "model",
//           parts: data,
//         },
//       ]);
//       setValue("");
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//       setError("Something went wrong, Please try again");
//     }
//   };

//   // const clear = () => {
//   //   setValue("");
//   //   setError("");
//   //   setChatHistory([]);
//   // };
//   return (
//     <div className="bg-zinc-900 pt-3 overflow-hidden h-screen flex flex-col justify-between">
//       <div className="overflow-y-auto px-4 py-2 flex-grow">
//         {chatHistory.map((chatItem, index) => (
//           <div key={index} className="mb-4">
//             <p className={`py-2 px-4 rounded-lg ${chatItem.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
//               <strong>{chatItem.role}:</strong> {chatItem.parts}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="max-w-2xl mx-auto px-4">
//         <div className="flex items-center py-2 px-3 bg-slate-900 rounded-lg ">

//         <input
//               className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Your message..."
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//             ></input>

//             <button
//               className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
//               title="Submit message"
//               onClick={getResponse}
//             >
//               <svg
//                 className="w-6 h-6 rotate-90"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
//               </svg>
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import { useState } from "react";
// import axios from "axios";

// const Chat = () => {
//   const [error, setError] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [value, setValue] = useState("");

//   const getResponse = async () => {
//     if (!value) {
//       setError("Please enter a prompt");
//       return;
//     }
//     try {
//       const prompt = `Provide a bulleted list of key concepts in ${value}`;
//       const response = await axios.post("http://localhost:8000/api/generate", {
//         history: chatHistory,
//         message: prompt,
//       });
//       console.log(response);

//       const data = response.data.text;
//       setChatHistory((oldChatHistory) => [
//         ...oldChatHistory,
//         {
//           role: "user",
//           parts: value,
//         },
//         {
//           role: "model",
//           parts: data,
//         },
//       ]);
//       setValue("");
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//       setError("Something went wrong, Please try again");
//     }
//   };

//   // const clear = () => {
//   //   setValue("");
//   //   setError("");
//   //   setChatHistory([]);
//   // };

//   return (
//     <div className="bg-zinc-900  pt-3 overflow-hidden">
//       <div className="">
//         {/* <div className="">
//           <input
//             value={value}
//             placeholder="Search Here ...."
//             onChange={(e) => setValue(e.target.value)}
//           />

//           {!error && <button onClick={getResponse}>Ask Me</button>}
//           {error && <button onClick={clear}>Clear</button>}
//         </div> */}

//         {/* {error && <p className="error">{error}</p>} */}
//         <div className="overflow-y-clip">
//           {chatHistory.map((chatItem, index) => (
//             <div key={index}>
//               <p className="py-2 border text-slate-50 border-x-blue-950 border-y-transparent  rounded my-2 px-5">
//                 {chatItem.role} : {chatItem.parts}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="max-w-2xl mx-auto ">
//           <div className="flex items-center py-2 px-3 bg-slate-900 rounded-lg ">

//             {/* <button
//                 type="button"
//                 className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                 title="Send message"
//               >
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" ></path></svg>
//               </button> */}
//             {/* <button
//                 type="button"
//                 className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//                 title="Clear message"
//               >
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" ></path></svg>
//               </button> */}

//             <input
//               className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Your message..."
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//             ></input>

//             <button
//               className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
//               title="Submit message"
//               onClick={getResponse}
//             >
//               <svg
//                 className="w-6 h-6 rotate-90"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* {error && <p className="error">{error}</p>}
//         <div className="">
//           {chatHistory.map((chatItem, index) => (
//             <div key={index}>
//               <p className="">
//                 {chatItem.role} : {chatItem.parts}
//               </p>
//             </div>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Chat;

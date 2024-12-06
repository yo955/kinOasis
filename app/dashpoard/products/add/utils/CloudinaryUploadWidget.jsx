// "use client";
// import { createContext, useEffect, useState } from "react";

// // Create a context to manage the script loading state
// const CloudinaryScriptContext = createContext();

// function CloudinaryUploadWidget({ uwConfig, setPublicId,setProduct,id }) {
//   const [loaded, setLoaded] = useState(false);

//   // const [images, setimages] = useState([]);
//   useEffect(() => {

//   }, []);
//   useEffect(() => {
//     // Check if the script is already loaded
//     if (!loaded) {
//       const uwScript = document.getElementById("uw");
//       if (!uwScript) {
//         // If not loaded, create and load the script
//         const script = document.createElement("script");
//         script.setAttribute("async", "");
//         script.setAttribute("id", "uw");
//         script.src = "https://upload-widget.cloudinary.com/global/all.js";
//         // script.addEventListener("load", () => setLoaded(true));
//         document.body.appendChild(script);
//       } else {
//         // If already loaded, update the state
//         setLoaded(true);
//       }
//     }
//   }, [loaded]);

//   const initializeCloudinaryWidget = ({}) => {
//     if (loaded) {
//       var myWidget = window.cloudinary.createUploadWidget(
//         uwConfig,
//         (error, result) => {
//           if (!error && result && result.event === "success") {
//             console.log("Done! Here is the image info: ");
//             setProduct((prevImages) => {
//               return {...prevImages,mainImage:result.info.url}
//             });
//             setPublicId(result.info.public_id);
//           }
//         }
//       );

//       document.getElementById(`${id}`).addEventListener(
//         "click",
//         function () {
//           myWidget.open();
//         },
//         false
//       );
//     }
//   };

//   return (
//     <>
//       <CloudinaryScriptContext.Provider value={{ loaded }}>
//         <button
//           id={id}
//           className="cloudinary-button"
//           onClick={initializeCloudinaryWidget}
//         >
//           Upload
//         </button>
//       </CloudinaryScriptContext.Provider>
//     </>
//   );
// }

// export default CloudinaryUploadWidget;
// export { CloudinaryScriptContext };


"use client";
import { useEffect, useRef, useState } from "react";

function CloudinaryUploadWidget({ uwConfig, setPublicId, setProduct, id,uniqueKey }) {
  const [loaded, setLoaded] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    // Load the Cloudinary script if not already loaded
    const scriptId = "cloudinary-upload-widget-script";
    const existingScript = document.getElementById(scriptId);

   
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      script.onerror = () => console.error("Failed to load Cloudinary script.");
      document.body.appendChild(script);
    
  }, []);

  useEffect(() => {
    // Initialize the widget only after the script is loaded
    if (loaded) {
      if (window.cloudinary && window.cloudinary.createUploadWidget) {
        widgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (error) {
              console.error("Cloudinary widget error:", error);
              return;
            }
  
            if (result.event === "success") {
              console.log(uniqueKey)
              console.log("Upload success:", result.info);
              
              setProduct((prev) => ({ ...prev, [`${uniqueKey}`]: uniqueKey == "images"?[...prev["images"],result.info.url]:result.info.url }));
              setPublicId(result.info.public_id);
            }
          }
        );
      } else {
        console.error("Cloudinary script is not loaded yet.");
      }
    }
  }, [loaded, uwConfig, setProduct, setPublicId]);

  const handleUploadClick = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.error("Widget is not ready yet.");
    }
  };

  return (
    <button
      id={id}
      className="cloudinary-button"
      onClick={handleUploadClick}
      disabled={!loaded}
    >
      {loaded ? "Upload" : "Loading..."}
    </button>
  );
}

export default CloudinaryUploadWidget;

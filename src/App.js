/*global chrome*/
import './App.css';
import { useState, useEffect } from 'react';

// state useState  usestate from react

function Profile({ image, name, isLive, channelId }) {

  const profileClass = "rounded-full min-w-16 min-h-16 max-w-16 max-h-16 " + (String(isLive) == "true" ? "outline outline-red-600" : "grayscale")
  return (

    <a className="relative px-2 pt-2 hover:bg-[#00FFA3]" target="_blank" href={"https://chzzk.naver.com/live/" + channelId} >
      <img className={profileClass} alt="image" src={image}></img>
      <p className="pt-2 pb-1 text-center text-white">{name}</p>
    </a>
  );
}

function App() {
  const [data, setData] = useState("");

  (async () => {
    await new Promise(() => {
      chrome.runtime.sendMessage("request", (response) => {
        setData(response.map(item =>
          <Profile name={item["channelName"]} isLive={item["isLive"]} image={item["channelImg"]} channelId={item["channelId"]} />
        ));
      })
    })
  })()

  return (
    <div className=" bg-black flex flex-row">
      {
        data != ""
          ? data
          : <p className='text-white p-10 text-center text-2xl'>Loading....</p>
      }
    </div>
  );
}





export default App;

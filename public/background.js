const streamers = [
    "bb382c2c0cc9fa7c86ab3b037fb5799c", // 침착맨
    "792b7d3e64c159a6d31ff67eee018f17", // 존직
    "eb9d42b9ac3f5d90e0155e45c9bc7a02"  // 슈말코
];
let arr = new Array(streamers.length);
let complete = 0;
async function Refresh() {
    for (let i = 0; i < streamers.length; i++) {
        let response = await fetch(`https://api.chzzk.naver.com/service/v1/channels/${streamers[i]}`);
        let json = await response.json();

        arr[i] = {};
        arr[i]["channelId"] = streamers[i];
        arr[i]["channelName"] = json["content"]["channelName"]
        arr[i]["channelImg"] = json["content"]["channelImageUrl"]
        arr[i]["isLive"] = json["content"]["openLive"]
    }
}


chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    (async () => {
        await Refresh();
        sendResponse(arr);

      })();
      return true; 
})
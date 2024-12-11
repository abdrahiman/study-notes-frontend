import ImageGallery from "react-image-gallery";
import {useState,useEffect} from "react";

export function Preview({images}:{images:string[]}) {
  let [items,setItemes] = useState([{original:"/test.jpg",thumbnail:"/test.jpg"}]);
  useEffect(()=>{
    let temp = [];
    if(!images)return;
    images.forEach(element => {
      temp.push({thumbnail:element,original:element});
    });
    setItemes(temp);
  },[])
  return (
    <ImageGallery showIndex showPlayButton={false} renderPlayPauseButton={(onClick, disabled) => (
  <button onClick={onClick} disabled={disabled} >Download</button>)} items={items}/>
  );
}

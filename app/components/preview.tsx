import ImageGallery from "react-image-gallery";
import { useState, useEffect } from "react";

export function Preview({ images }: { images: string[] }) {
  let [items, setItemes] = useState([
    { original: "/test.jpg", thumbnail: "/test.jpg" },
  ]);
  useEffect(() => {
    let temp: any = [];
    if (!images) return;
    images.forEach((element) => {
      temp.push({ thumbnail: element, original: element });
    });
    setItemes(temp);
  }, []);
  return (
    <ImageGallery
      showIndex
      className="w-full h-full"
      showPlayButton={false}
      renderPlayPauseButton={(onClick: any, disabled: boolean) => (
        <button onClick={onClick} disabled={disabled}>
          Download
        </button>
      )}
      items={items}
    />
  );
}

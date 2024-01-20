import React from "react";
import logo from './logo.svg';
import { FileUploader } from "react-drag-drop-files";
import './App.css';
import DragDropTwo from "./DragDrop.tsx";
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const fileTypes = ["JPG", "PNG"];

function ImagesDisplayed({images, dragUrl}){
  const imageItems = images.map(image =>
    <li class="list-group-item">
      <img
        alt="img"
        class="limit-img-size"
        src={image}
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />  
    </li>
    
  );
  return imageItems;
}

function undoImage (setDragImages, dragImages){
  setDragImages(dragImages.slice(0, -1));
}

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

function App() {
  const [data, setData] = React.useState(null);
  const [images, setImages] = React.useState([]);
  console.log(images);
  const [fixedImages, setFixedImages] = React.useState([]);
  console.log(fixedImages);

  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  
  const [dragImages, setDragImages] = React.useState([]);
  
  

  const [postId, setPostId] = React.useState(null);

  /*React.useEffect(() => {
        // POST request using fetch inside useEffect React hook
        if (!(images.length === fixedImages.length)){
          console.log("bye");
          console.log(JSON.stringify({ imagesPart: images[images.length - 1]}));
          const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ images: images[images.length - 1]}),
            headers: { 'Content-Type': 'application/json' }
            
          };
          fetch("/api", requestOptions)
              .then(response => response.json())
              .then(data => {
                setPostId(data.images);
                setFixedImages([...fixedImages, postId]);
              });
        }
           

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [images, fixedImages]);
    */
  return (
    
    <div className="App">

      <h1>Sticker Board</h1>
        <div id="editing-zone" class="container">
            <div class="row align-items center">
                <div id="images-bar" class="col-3">
                    <ul class="list-group">
                        <li class="list-group-item">First image may take a minute to load</li>
                        <ImagesDisplayed images={images} dragUrl={dragUrl}/>
                        
                    </ul>
                    <DragDropTwo images={images} setImages={setImages}/>

                </div>
                <div id="window" class="col-9">
                    <div id="buttons">
                        <div id="left-button">

                        </div>
                        <div id="right-button">
                        <button type="button" onClick={() => undoImage(setDragImages, dragImages)} className="btn btn-light">
                              Undo</button>
                            
                        </div>
                    </div>
                    <div class="pinboard">
                    <div
                      onDrop={(e) => {
                        e.preventDefault();
                        // register event position
                        stageRef.current.setPointersPositions(e);
                        // add image

                        setDragImages(
                          dragImages.concat([
                            {
                              ...stageRef.current.getPointerPosition(),
                              src: dragUrl.current,
                            },
                          ])
                        );
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <Stage
                        width={window.innerWidth}
                        className={"wooder"}
                        height={800}
                        style={{ 
                                   }}
                        ref={stageRef}
                        
                      >
                        <Layer>
                          {dragImages.map((image) => {
                            return <URLImage image={image} />;
                          })}
                        </Layer>
                      </Stage>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;

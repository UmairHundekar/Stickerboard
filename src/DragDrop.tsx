import { DragEvent, useState } from 'react';
import imglyRemoveBackground from "@imgly/background-removal";
import { useEffect } from 'react';



export function FileDrop({images, setImages}) {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
 
  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };
 
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };
 
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
 
    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
 
    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        console.log(reader.result);
        console.log(images);

      
        
      imglyRemoveBackground(reader.result).then((blob: Blob) => {
          // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src

          setImages([...images, URL.createObjectURL(blob)]);
        })
        //URL.createObjectURL(blob)
        
        };
 
      reader.onerror = () => {
        console.error('There was an issue reading the file.');
      };
 
      reader.readAsDataURL(file);
      return reader;
    });
  };
 
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '300px',
        border: '1px dotted',
        backgroundColor: isOver ? 'lightgray' : 'white',
      }}
    >
      Drag one image into box at a time
    </div>
  );
}

export default FileDrop;
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploader({onChange} : {onChange: (value: File) => void}) {
  const [imageURL, setImageURL] = useState<string>('');
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageURL(reader.result as string);
      setImageStyle({ backgroundImage: `url(${reader.result})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' });
      onChange(acceptedFiles[0])
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-gray-300 border-dashed p-6 rounded-md" style={{ width: '300px', height: '200px', ...imageStyle }}>
      <input {...getInputProps()} />
      {imageURL === '' ?
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop your files here, or click to select files</p>:
          null
      }
    </div>
  );
}

export default FileUploader;

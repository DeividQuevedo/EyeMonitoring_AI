import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { detectEyes } from './EyeDetection';

function CameraView() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      detectEyes(videoRef.current); // Detecta os olhos
    }
  }, [stream]);

  return (
    <div className="camera-view">
      <video ref={videoRef} autoPlay playsInline className="camera-feed" />
    </div>
  );
}

export default CameraView;

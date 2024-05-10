import * as faceapi from 'face-api.js';

let canvas = null;

// Função para detectar os olhos no vídeo
export const detectEyes = async (videoElement) => {
  const video = videoElement;
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  canvas = canvas || document.createElement('canvas');
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video,
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    resizedDetections.forEach(detection => {
      const box = detection.detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' });
      drawBox.draw(canvas);
      const landmarks = detection.landmarks;
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const drawLeftEye = new faceapi.draw.DrawBox(leftEye, { label: 'Left Eye' });
      const drawRightEye = new faceapi.draw.DrawBox(rightEye, { label: 'Right Eye' });
      drawLeftEye.draw(canvas);
      drawRightEye.draw(canvas);
    });
  }, 500); // Ajuste o intervalo conforme necessário

  return canvas;
};

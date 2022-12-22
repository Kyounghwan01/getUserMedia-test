import React, { useState, useEffect, useRef } from 'react';

const Index = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [canvasImage, setCanvasImage] = useState('');
	const [screenWidth, setScreenWidth] = useState(0);
	const [screenHeight, setScreenHeight] = useState(0);
	// const [currentStep, setCurrentStep] = useState(1);
	// const [pictureList, setPictureList] = useState([
	// 	{ type: 'carFront', data: '', step: 1 },
	// 	{ type: 'carBack', data: '', step: 2 },
	// ]);

	const getWebcam = callback => {
		try {
			const constraints = {
				// video: { facingMode: 'environment' },
				video: { facingMode: 'environment', width: { exact: 1920 }, height: { exact: 1080 }, mandatory: { minWidth: 1920, minHeight: 1080, frameRate: { min: 20, ideal: 30, max: 30 } } },
				audio: false,
			};
			navigator.mediaDevices.getUserMedia(constraints).then(callback);
		} catch (err) {
			console.log(err);
			return undefined;
		}
	};

	useEffect(() => {
		setScreenHeight(window.innerHeight);
		setScreenWidth(window.innerWidth);
		getWebcam(stream => {
			videoRef.current.srcObject = stream;
			videoRef.current.play();
			console.log(stream.getVideoTracks()[0]);
		});
	}, []);

	const captureVideo = () => {
		console.log(123);
		const context = canvasRef.current.getContext('2d');
		context.fillStyle = '#AAA';
		// context.fillRect(0, 0, screenWidth, screenHeight);
		context.drawImage(videoRef.current, 0, 0, screenWidth, screenHeight);

		const data = canvasRef.current.toDataURL('image/png');

		setCanvasImage(data);
		console.log(data);
	};

	return (
		<>
			<div className="camera">
				{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
				<video ref={videoRef} id="video" style={{ width: '100vw', height: '80vh', objectFit: 'fill' }}>
					Video stream not available.
				</video>

				<div style={{ height: '100px' }}>wdwd</div>
				<canvas width={screenWidth} height={screenHeight} ref={canvasRef} id="canvas" style={{ display: 'none' }} />
				{canvasImage && <img alt="ddd" src={canvasImage} height={screenHeight} width={screenWidth} />}
				<div className="camera-inner">
					<div>7/8</div>
					<div>조수석 옆면 촬영</div>
					<div>옆면 전체가 잘 보이도록...</div>
					https://github.com/mdn/samples-server/blob/master/s/webrtc-capturestill/index.html
					<button onClick={captureVideo} style={{ padding: '10px', background: 'red' }}>
						Take photo
					</button>
				</div>
			</div>
			<canvas id="canvas"> </canvas>
		</>
	);
};

export default Index;

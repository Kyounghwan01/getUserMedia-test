import React, { useState, useEffect, useRef } from 'react';

export const WEBRTC_QUALITY = {
	HD: { width: { exact: 1280 }, height: { exact: 720 } },
	FULL_HD: { width: { exact: 1920 }, height: { exact: 1080 } },
	'4K': { width: { exact: 4096 }, height: { exact: 2160 } },
	'8K': { width: { exact: 7680 }, height: { exact: 4320 } },
};

const Index = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [canvasImage, setCanvasImage] = useState([]);
	const [screenWidth, setScreenWidth] = useState(0);
	const [screenHeight, setScreenHeight] = useState(0);
	// const [currentStep, setCurrentStep] = useState(1);
	// const [pictureList, setPictureList] = useState([
	// 	{ type: 'carFront', data: '', step: 1 },
	// 	{ type: 'carBack', data: '', step: 2 },
	// ]);

	// const getIphoneMediaStream = (callback) => {
	// 	const constraints = (window.constraints = {
	// 		audio: false,
	// 		video: { facingMode: 'environment', ...WEBRTC_QUALITY['FULL_HD'], mandatory: { minWidth: 1920, minHeight: 1080, frameRate: { min: 20, ideal: 30, max: 30 } } },
	// 	});

	// 	 navigator.mediaDevices.getUserMedia(constraints).then(callback);
	// };

	// const getWebcam = callback => {
	// 	try {
	// 		const constraints = {
	// 			// video: { facingMode: 'environment' },
	// 			video: { facingMode: 'environment', width: { exact: 1920 }, height: { exact: 1080 }, mandatory: { minWidth: 1920, minHeight: 1080, frameRate: { min: 20, ideal: 30, max: 30 } } },
	// 			audio: false,
	// 		};
	// 		navigator.mediaDevices.getUserMedia(constraints).then(callback);
	// 	} catch (err) {
	// 		console.log(err);
	// 		return undefined;
	// 	}
	// };

	// eslint-disable-next-line
	useEffect(() => {
		const innerW = window.innerWidth / 3;
		setScreenHeight(innerW);
		setScreenWidth(innerW);
		// test();
		// eslint-disable-next-line
	}, []);

	// const test = async () => {
	// 	try {
	// 		const stream = await navigator.mediaDevices.getUserMedia({
	// 			audio: false,
	// 			video: true,
	// 			// video: {facingMode: { exact: "environment" }},
	// 		  });
	// 		handleSuccess(stream);

	// 		// getDivice();
	// 	  } catch (e) {
	// 		// OverconstrainedError -> 존재하지않는 constraints 기기 타입을 찾는 경우, 카메라없는데 video 접근하는 경우
	// 		console.log(e);
	// 		window.confirm('후방 카메라를 찾을 수 없습니다.');
	// 	  }
	// }

	const captureVideo = () => {
		console.log(123);
		const context = canvasRef.current.getContext('2d');
		context.fillStyle = '#AAA';
		// context.fillRect(0, 0, screenWidth, screenHeight);
		context.drawImage(videoRef.current, 0, 0, screenWidth, screenHeight);

		const data = canvasRef.current.toDataURL('image/png');
		const imgList = [...canvasImage, data];
		setCanvasImage(imgList);
		console.log(data);
	};

	// function handleSuccess(stream) {
	// 	// const video = document.querySelector("video");
	// 	// const videoTracks = stream.getVideoTracks();
	// 	// // console.log("Got stream with constraints:", constraints);
	// 	// console.log(`Using video device: ${videoTracks[0].label}`);
	// 	// window.stream = stream; // make variable available to browser console
	// 	// video.srcObject = stream;
	// 	videoRef.current.stream = stream;
	// 	videoRef.current.srcObject = stream;
	//   }
	  

	return (
		<div className="box">
			<div className="camera">
				{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
				<video ref={videoRef} autoPlay playsInline id="video" style={{ width: '100vh', height: '100vw', objectFit: 'fill' }}>
					Video stream not available.
				</video>

				<div className="content">
					<h1>test 글짜</h1>

					<button onClick={captureVideo} style={{ padding: '10px', background: 'red' }}>
						Take photo
					</button>
				</div>

				{/* <canvas width={screenWidth} height={screenHeight} ref={canvasRef} id="canvas" style={{ display: 'none' }} /> */}
				{/* {canvasImage && <img alt="ddd" src={canvasImage} height={screenHeight} width={screenWidth} />} */}
				{canvasImage.length && (
					canvasImage.map(img => {
						return (
							<img alt="ddd" src={img} height={screenHeight} width={screenWidth} />
						)
					})
				)}
				
			</div>
			<canvas id="canvas"> </canvas>
			<style>
					{`
						.box {
							transform: rotate(270deg);
							transform-origin: top left;
							position: absolute;
							top: 100%;
							left: 0;
							width: 100vh;
							height: 100vw;
							overflow: hidden;
						}
						.content {
							position: absolute;
							top: 0;
							left: 0;
						}
					`}
			</style>
		</div>
	);
};

export default Index;

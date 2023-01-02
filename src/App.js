import React, { useState, useEffect, useRef } from 'react';

export const WEBRTC_QUALITY = {
	HD: { width: { exact: 1280 }, height: { exact: 720 } },
	FULL_HD: { width: { exact: 1920 }, height: { exact: 1080 } },
	'4K': { width: { exact: 4096 }, height: { exact: 2160 } },
	'8K': { width: { exact: 7680 }, height: { exact: 4320 } },
};

const script = [{ title: '정면 촬영', descript: '정면 전체와 번호판이 잘 보이도록 <br />가이드를 따라 촬영해 주세요' }, { title: '운전석 앞 모서리 촬영', descript: '가이드라인을 따라 촬영해 주세요' }]

const Index = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [canvasImage, setCanvasImage] = useState([]);
	const [screenWidth, setScreenWidth] = useState(0);
	const [screenHeight, setScreenHeight] = useState(0);


	useEffect(() => {
		const innerW = window.innerWidth / 3;
		setScreenHeight(innerW);
		setScreenWidth(innerW);
		test();
		// eslint-disable-next-line
	}, []);

	const test = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				// video: true,
				video: { facingMode: { exact: "environment" }, ...WEBRTC_QUALITY['FULL_HD'], mandatory: { minWidth: 1920, minHeight: 1080, frameRate: { min: 20, ideal: 30, max: 30 } } },
			});
			handleSuccess(stream);

			// getDivice();
		} catch (e) {
			// OverconstrainedError -> 존재하지않는 constraints 기기 타입을 찾는 경우, 카메라없는데 video 접근하는 경우
			console.log(e);
			window.confirm('후방 카메라를 찾을 수 없습니다.');

			const deviceList = await navigator.mediaDevices.enumerateDevices();
			console.log(deviceList)

			// const videoDevice = deviceList
			// 	.filter(device => device.kind === 'videoinput' && (device.label.match(/back/g) || device.label.match(/environment/g)))
			// 	.reverse();

			const videoDevice = deviceList
				.filter(device => device.kind === 'videoinput' && device.label.match(/back/g))
				.reverse();

			window.confirm(JSON.stringify(videoDevice));




			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: { deviceId: { exact: videoDevice[0].deviceId }, ...WEBRTC_QUALITY['FULL_HD'], mandatory: { minWidth: 1920, minHeight: 1080, frameRate: { min: 20, ideal: 30, max: 30 } }},
			});
			handleSuccess(stream);
		}
	}

	const captureVideo = () => {
		const context = canvasRef.current.getContext('2d');
		context.fillStyle = '#AAA';
		// context.fillRect(0, 0, screenWidth, screenHeight);
		context.drawImage(videoRef.current, 0, 0, screenWidth, screenHeight);

		const data = canvasRef.current.toDataURL('image/png');
		const imgList = [...canvasImage, data];
		setCanvasImage(imgList);
		console.log(data);
	};

	function handleSuccess(stream) {
		videoRef.current.stream = stream;
		videoRef.current.srcObject = stream;
	}


	return (
		<>
			{
				(canvasImage.length && canvasImage.length >= script.length) ? (
					<div>
						{canvasImage.length && (
							canvasImage.map(img => {
								return (
									<img key={img} alt="ddd" src={img} height={screenHeight} width={screenWidth} />
								)
							})
						)}
					</div>
				) : (
					<>
						<video ref={videoRef} autoPlay playsInline id="video">
							Video stream not available.
						</video>
						<div className="boxc">
							<div className="camera">
								<div className="content">
									<h1>{script[canvasImage.length].title}</h1>
									<h2>{script[canvasImage.length].descript}</h2>

									<button onClick={captureVideo} style={{ padding: '10px', background: 'red' }}>
										Take photo
									</button>
								</div>

								<canvas width={screenWidth} height={screenHeight} ref={canvasRef} id="canvas" style={{ display: 'none' }} />
							</div>
						</div>
					</>
				)
			}
			<style>
				{`
						video {
							width: 100vw;
							height: 100vh;
							object-fit: fill;
						}
						.content {
							position: absolute;
							top: 0;
							left: 0;
						}
						@media only screen and (orientation:portrait) {
							.boxc {
							  height: 100vw;
							  transform: rotate(90deg);
							  position: absolute;
							  top: 0;
							  width: 100%;
							  left: 0;
							}
						}
						@media only screen and (orientation:landscape) {
							video {
								width: 100vw;
								height: 100vh;
								object-fit: fill;
							}
						}
					`}
			</style>

		</>
	);
};

export default Index;

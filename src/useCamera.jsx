import { useRef, useEffect } from 'react';
import useStores from './useStores';


export const WEBRTC_QUALITY = {
	HD: { width: { exact: 1280 }, height: { exact: 720 } },
	FULL_HD: { width: { exact: 1920 }, height: { exact: 1080 } },
	'4K': { width: { exact: 4096 }, height: { exact: 2160 } },
	'8K': { width: { exact: 7680 }, height: { exact: 4320 } },
};

const useCamera = () => {
	const { cameraTestStore } = useStores();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		cameraTestStore.setScreenHeight(window.innerHeight);
		cameraTestStore.setScreenWidth(window.innerWidth);
		getCamera();
        // eslint-disable-next-line
	}, []);

	const stopStream = () => {
		if (videoRef.current && videoRef.current.stream) {
			videoRef.current.stream.getTracks().forEach(track => {
				track.stop();
			});
		}
	};

	const getCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: { exact: 'environment' },
					...WEBRTC_QUALITY['FULL_HD'],
					mandatory: { minWidth: 1920, minHeight: 1080, frameRate: { min: 20, ideal: 30, max: 30 } },
				},
			});
			handleSuccess(stream);
		} catch (e) {
			let stream = {};
			// OverconstrainedError -> 존재하지않는 constraints 기기 타입을 찾는 경우, 카메라없는데 video 접근하는 경우
			console.log(e);
			const deviceList = await navigator.mediaDevices.enumerateDevices();

			const videoDevice = deviceList
				.filter(device => device.kind === 'videoinput' && (device.label.match(/back/g) || device.label.match(/environment/g)))
				.reverse();

			if (!videoDevice.length) {
				stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
				handleSuccess(stream);
			} else {
				for (const media of videoDevice) {
					const stream = await navigator.mediaDevices.getUserMedia({
						audio: false,
						video: { deviceId: { exact: media.deviceId }, ...WEBRTC_QUALITY['FULL_HD'] },
					});
					if (stream) {
						handleSuccess(stream);
						return;
					}
				}
			}
		}
	};

	const captureVideo = () => {
		if (!canvasRef.current || !videoRef.current) return;
		const context = canvasRef.current.getContext('2d');
		context.fillStyle = '#AAA';
		context.drawImage(videoRef.current, 0, 0, cameraTestStore.screenWidth, cameraTestStore.screenHeight);

		const data = canvasRef.current.toDataURL('image/png');
		const imgList = [...cameraTestStore.canvasImage, data];
		cameraTestStore.setCanvasImage(imgList);
		cameraTestStore.setIsViewPreview(true);
	};

	function handleSuccess(stream) {
		if (!videoRef.current) return;
		videoRef.current.stream = stream;
		videoRef.current.srcObject = stream;
	}

	const handleNextStep = () => {
		const nextStep = cameraTestStore.currentStep + 1;
		if (nextStep - 1 === cameraTestStore.step.length) {
			stopStream();
		}
		cameraTestStore.setIsViewPreview(false);
		cameraTestStore.setCurrentStep(nextStep);
	};

	const retryCapture = () => {
		cameraTestStore.setCanvasImage(cameraTestStore.canvasImage.filter((_, index) => index !== cameraTestStore.canvasImage.length - 1));
		cameraTestStore.setIsViewPreview(false);
	};

	return {
		retryCapture,
		videoRef,
		captureVideo,
		canvasRef,
		handleNextStep,
	};
};
export default useCamera;

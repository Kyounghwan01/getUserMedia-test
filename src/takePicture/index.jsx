import { observer } from 'mobx-react';
import useCamera from '../useCamera';
import useStores from '../useStores';

const Index = () => {
	const { cameraTestStore } = useStores();
	const { retryCapture, videoRef, captureVideo, canvasRef, handleNextStep } = useCamera();
	return (
		<>
			<>
				<video hidden={cameraTestStore.isViewPreview} ref={videoRef} autoPlay playsInline id="video">
					<track kind="captions" />
				</video>
				{cameraTestStore.isViewPreview ? (
					<div className="preview-container">
						<div className="">
							<img alt="preview" src={cameraTestStore.canvasImage[cameraTestStore.currentStep - 1].src} />
							<div className="shotmode">
								<button onClick={retryCapture}>
									<div>다시찍기</div>
								</button>
								<button onClick={handleNextStep}>
									<div>다음</div>
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="boxc">
						<div className="camera">
							<div className="content">
								<h1>{cameraTestStore.currentStep}</h1>
								<h2>{cameraTestStore.step[cameraTestStore.currentStep - 1].label}</h2>

								<button onClick={captureVideo} style={{ padding: '10px', background: 'red' }}>
									Take photo
								</button>
							</div>

							<canvas width={cameraTestStore.screenWidth} height={cameraTestStore.screenHeight} ref={canvasRef} id="canvas" style={{ display: 'none' }} />
						</div>
					</div>
				)}
			</>
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
						.shotmode {
							display: flex;
							background-color: rgba(0,0,0,0.7);
							position: absolute;
							right: 0;
							bottom: 0;
							left: 0;
							flex-direction: row-reverse;
						  }
						  .shotmode button {
							height: 120px;
							flex: 1;
							background: transparent;
							border: 0;
							color: #fff;
						  }
						  .shotmode button div {
							display: inline-block;
							transform: rotate(90deg);
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
							.preview-container img {
								width: 100vw;
								height: 100vh;
								object-fit: fill;
							}
							.shotmode {
								right: 0;
								left: auto;
								bottom: 0;
								top: 0;
								flex-direction: column;
							  }
							  .shotmode button {
								width: 120px;
								height: auto;
							  }
							  .shotmode button div{
								transform: rotate(0);
							  }
						}
					`}
			</style>
		</>
	);
};

export default observer(Index);

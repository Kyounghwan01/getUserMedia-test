import { useState } from 'react';
import { observer } from 'mobx-react';
import useStores from '../useStores';

const Index = () => {
	const { cameraTestStore } = useStores();
	const [imageDirection, setImageDirection] = useState('img');

	const checkImageWithHeight = ({ target: img }) => {
		// 8개 사진 나오는 미리보기 때 찍었는데 이미지가 세로가 가로보다 크면 이미지 90도 로테이트
		console.log(img.naturalHeight, img.naturalWidth);
		alert(img.naturalHeight, img.naturalWidth);
		setImageDirection(img.naturalHeight > img.naturalWidth ? 'revers-img' : 'img');
	};

	return (
		<>
			<div>
				{!cameraTestStore.isViewResultPreview ? (
					<>
						{cameraTestStore.canvasImage.map((img, index) => {
							return (
								<img
									key={img}
									style={{
										width: '60px',
										height: '60px',
										borderRadius: '50%',
									}}
                                    alt="dw"
									src={img}
									onClick={() => {
										cameraTestStore.setSelectPictureIndex(index);
										cameraTestStore.setIsViewResultPreview(true);
									}}
								/>
							);
						})}
					</>
				) : (
					<div className="preview-container">
						<img className={imageDirection} onLoad={checkImageWithHeight} alt="preview" src={cameraTestStore.canvasImage[cameraTestStore.selectPictureIndex]} />
						<div className="shotmode">
							<button>
								<div>다시찍기</div>
							</button>
							<button>
								<div>확인</div>
							</button>
						</div>
					</div>
				)}

				{/*{typeof previewImageIndex === 'number' ? (*/}
				{/*	<div className="">*/}
				{/*		<img alt="preview" onLoad={checkImageWithHeight} src={canvasImage[previewImageIndex]} onClick={() => previewImage(false)} />*/}
				{/*		<div className="shotmode">*/}
				{/*			<button>*/}
				{/*				<div>다시찍기</div>*/}
				{/*			</button>*/}
				{/*			<button>*/}
				{/*				<div>다음</div>*/}
				{/*			</button>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*) : (*/}
				{/*	<>*/}
				{/*		{canvasImage.length &&*/}
				{/*			canvasImage.map((img, index) => {*/}
				{/*				return (*/}
				{/*					<div*/}
				{/*						key={img}*/}
				{/*						style={{*/}
				{/*							height: '100vh',*/}
				{/*							width: '100vw',*/}
				{/*							display: 'flex',*/}
				{/*							justifyContent: 'center',*/}
				{/*							alignItems: 'center',*/}
				{/*							backgroundColor: '#000000',*/}
				{/*						}}>*/}
				{/*						<img*/}
				{/*							style={{*/}
				{/*								height: '100vw',*/}
				{/*								transform: 'rotate(90deg)',*/}
				{/*							}}*/}
				{/*							onClick={() => previewImage(index)}*/}
				{/*							alt="ddd"*/}
				{/*							src={img}*/}
				{/*						/>*/}
				{/*					</div>*/}
				{/*				);*/}
				{/*			})}*/}
				{/*	</>*/}
				{/*)}*/}
			</div>
			<style>
				{`
						.preview-container {
							height: 100vh;
							width: 100vw;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: black;
						}
						.revers-img {
							height: 100vw;
							transform: rotate(90deg)
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
						  }
						  .shotmode button {
							height: 120px;
							flex: 1;
							background: transparent;
							border: 0;
							color: #fff;
						  }
					`}
			</style>
		</>
	);
};

export default observer(Index);

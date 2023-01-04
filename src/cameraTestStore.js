const init = {
	currentStep: 1,
	canvasImage: [],  // [{src: '', width: 999, height: 999}]
	screenWidth: 0,
	screenHeight: 0,
	isViewPreview: false,
	isViewResultPreview: false,
	selectPictureIndex: 0,
	step: [
		{ step: 1, label: '렌터카 정면을 찍어주세요' },
		// { step: 2, label: '운전석 앞쪽 모서리를 찍어주세요' },
		// { step: 3, label: '운전석 옆면을 찍어주세요' },
		// { step: 4, label: '운전석 뒤 모서리를 찍어주세요' },
		// { step: 5, label: '후면을 찍어주세요' },
		// { step: 6, label: '조수석 뒤 모서리를 찍어주세요' },
		// { step: 7, label: '조수석 옆면을 찍어주세요' },
		// { step: 8, label: '조수석 앞 모서리를 찍어주세요' },
	],
};

const cameraTestStore = () => ({
	...init,
	setCurrentStep(step) {
		this.currentStep = step;
	},
	setCanvasImage(image) {
		this.canvasImage = image;
	},
	setScreenWidth(width) {
		this.screenWidth = width;
	},
	setScreenHeight(height) {
		this.screenHeight = height;
	},
	setIsViewPreview(payload) {
		this.isViewPreview = payload;
	},
	setIsViewResultPreview(payload) {
		this.isViewResultPreview = payload;
	},
	setSelectPictureIndex(pictureIndex) {
		this.selectPictureIndex = pictureIndex;
	},
});

export default cameraTestStore;

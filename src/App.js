import { observer, Provider, useLocalObservable } from 'mobx-react';
import CameraTestStore from './cameraTestStore';
import CameraResult from './cameraResult';
import TakePicture from './takePicture';

const Index = () => {
	const cameraTestStore = useLocalObservable(CameraTestStore);

	return (
		<Provider cameraTestStore={cameraTestStore}>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			{cameraTestStore.currentStep >= cameraTestStore.step.length + 1 ? <CameraResult /> : <TakePicture />}
		</Provider>
	);
};

export default observer(Index);

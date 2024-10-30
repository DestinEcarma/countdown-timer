import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

export const timerStart = (value: number) => {
	eventEmitter.emit("start", value);
};

export const timerPause = () => {
	eventEmitter.emit("pause");
};

export const timerReset = () => {
	eventEmitter.emit("reset");
};

export const timerStop = () => {
	eventEmitter.emit("stop");
};

export const useTimerEvent = () => {
	return eventEmitter;
};

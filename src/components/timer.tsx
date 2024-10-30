import React, { useEffect } from "react";
import { useTimerEvent } from "../utils/timer";

interface NumberProps {
	value: number;
}

const Digit: React.FC<NumberProps> = ({ value }) => {
	return <span className="rounded-lg border p-2 font-mono text-8xl">{value}</span>;
};

const Pair: React.FC<NumberProps & { name: string }> = ({ value, name }) => {
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex gap-2">
				<Digit value={Math.floor(value / 10)} />
				<Digit value={value % 10} />
			</div>
			<span className="font-semibold">{name}</span>
		</div>
	);
};

const Timer: React.FC = () => {
	const [initialTime, setInitialTime] = React.useState<number>(0);
	const [time, setTime] = React.useState<number>(0);
	const [status, setStatus] = React.useState<boolean>(true);
	const observer = useTimerEvent();

	useEffect(() => {
		const start = (value: number) => {
			setStatus(true);
			setInitialTime(value);
			setTime(value);
		};

		const pause = () => setStatus(false);
		const reset = () => setTime(initialTime);
		const stop = () => setTime(0);

		observer.on("start", start);
		observer.on("pause", pause);
		observer.on("reset", reset);
		observer.on("stop", stop);

		return () => {
			observer.off("start", start);
			observer.off("pause", pause);
			observer.off("reset", reset);
			observer.off("stop", stop);
		};
	});

	useEffect(() => {
		if (time <= 0 || !status) return;

		const id = setTimeout(() => {
			setTime((prev) => prev - 1);
		}, 1000);

		return () => {
			if (time > 0) clearTimeout(id);
		};
	}, [time, setTime, status]);

	const hours = Math.floor(time / 3600) % 99;
	const minutes = Math.floor(time / 60) % 60;
	const seconds = time % 60;

	return (
		<div className="flex justify-center gap-8">
			<Pair value={hours} name="Hours" />
			<Pair value={minutes} name="Minutes" />
			<Pair value={seconds} name="Seconds" />
		</div>
	);
};

export default Timer;

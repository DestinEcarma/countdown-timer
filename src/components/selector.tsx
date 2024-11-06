import React from "react";
import { timerPause, timerStart } from "../utils/timer";

interface PairProps {
	value: number;
	name: string;
	max: number;
	index: number;
	refs: React.MutableRefObject<HTMLInputElement[]>;
}

const Pair: React.FC<PairProps> = ({ value, name, max, index, refs }) => {
	const [first, setFirst] = React.useState<number>(Math.floor(value / 10));
	const [second, setSecond] = React.useState<number>(value % 10);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value || "0");
		if (isNaN(value)) return;

		if (e.target.name !== "second") {
			refs.current[index + 1].focus();
			setFirst(Math.min(Math.abs(value % 10), max));
		} else {
			if (index + 2 < refs.current.length) refs.current[index + 2].focus();
			setSecond(Math.abs(value % 10));
		}
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex gap-2">
				<input
					size={1}
					type="number"
					name="first"
					value={first}
					onChange={onChange}
					maxLength={2}
					ref={(el) => {
						if (el) refs.current[index] = el;
					}}
				/>
				<input
					size={1}
					type="number"
					name="second"
					value={second}
					onChange={onChange}
					maxLength={2}
					ref={(el) => {
						if (el) refs.current[index + 1] = el;
					}}
				/>
			</div>
			<span className="font-semibold">{name}</span>
		</div>
	);
};

const Selector: React.FC = () => {
	const [status, setStatus] = React.useState<boolean>(false);

	const refs = React.useRef<HTMLInputElement[]>([]);

	const calculateTime = () => {
		const h1 = parseInt(refs.current[0].value || "0");
		const h2 = parseInt(refs.current[1].value || "0");
		const m1 = parseInt(refs.current[2].value || "0");
		const m2 = parseInt(refs.current[3].value || "0");
		const s1 = parseInt(refs.current[4].value || "0");
		const s2 = parseInt(refs.current[5].value || "0");

		const hours = h1 * 10 + h2;
		const minutes = m1 * 10 + m2;
		const seconds = s1 * 10 + s2;

		return hours * 3600 + minutes * 60 + seconds;
	};

	const startButton = () => {
		setStatus(true);
		timerStart(calculateTime());
	};

	const stopButton = () => {
		setStatus(false);
		timerPause();
	};

	return (
		<>
			<h2 className="mb-4 text-center text-2xl font-semibold">Selector</h2>
			<div className="flex justify-center gap-8">
				<Pair value={0} name="Hours" max={9} index={0} refs={refs} />
				<Pair value={0} name="Minutes" max={5} index={2} refs={refs} />
				<Pair value={0} name="Seconds" max={5} index={4} refs={refs} />
			</div>
			<div className="my-4 text-center">
				{status ? (
					<button className="rounded bg-red-500 px-4 py-2 text-white" onClick={stopButton}>
						Stop
					</button>
				) : (
					<button className="rounded bg-green-500 px-4 py-2 text-white" onClick={startButton}>
						Start
					</button>
				)}
			</div>
		</>
	);
};

export default Selector;

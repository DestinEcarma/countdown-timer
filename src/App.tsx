import Header from "./components/header";
import Selector from "./components/selector";
import Timer from "./components/timer";

function App() {
	return (
		<>
			<Header />
			<div className="screen">
				<Selector />
				<Timer />
			</div>
		</>
	);
}

export default App;

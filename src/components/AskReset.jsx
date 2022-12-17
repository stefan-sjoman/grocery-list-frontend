import './ask-reset.css';

const AskReset = ({setShowReset, resetList}) => {
	return(
		<section className="ask-reset-section">
			<p className="ask-reset-text">
				<span> ⚠️ </span>Vill du radera listan?
			</p>
			<button className="ask-reset-btn" onClick={resetList}>RADERA</button>
			<button className="ask-reset-btn cancel-reset-btn" onClick={() => setShowReset(false)}>AVBRYT</button>
		</section>
	);
}

export default AskReset;
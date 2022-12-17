import './duplicate-warning.css'

const DuplicateWarning = ({duplicatedItem, setShowDuplicate}) => {
	return(
		<section className="duplicate-warning-section">
			<p className="duplicate-warning-text">
				<span> ⚠️ </span>{duplicatedItem} fanns i listan
			</p>
			<div className="close-warning-btn" onClick={() => setShowDuplicate(false)}>X</div>
		</section>
	);
}

export default DuplicateWarning;
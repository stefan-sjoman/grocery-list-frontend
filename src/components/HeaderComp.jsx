import './header-comp.css';

const HeaderComp = ({setShowReset}) => {
	return(
		<header className="header-comp">
			<div className="trademark">
				<h1>Grocery List</h1>
			</div>
			<button className="reset-btn" onClick={() => setShowReset(true)}></button>
		</header>
	);
}

export default HeaderComp;
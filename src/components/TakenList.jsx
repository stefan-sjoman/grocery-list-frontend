import './taken-list.css';
import ListItem from "./ListItem";

const TakenList = ({moveToBuy, removeTaken, takenItems}) => {
		
	return(
		<div className="taken-list">
			<h2>Tagits</h2>
			{takenItems.length > 0 ?
				<ul>
					{takenItems.map((item) => 
					<li key={item}>
						<div className="list-item-wrapper" onClick={() => moveToBuy(item)}>
							<ListItem item ={item} />
						</div>
						<div className="remove-btn" onClick={() => removeTaken(item)} ></div>
					</li>
					)}
				</ul>
			:
				<ul>
					<li>Tryck på varan när du plockat den</li>
				</ul>
			}

				
		</div>
	);
}

export default TakenList;
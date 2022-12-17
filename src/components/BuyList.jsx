import './buy-list.css';
import ListItem from "./ListItem";

const BuyList = ({moveToCollected, deleteItem, buyItems}) => {

	return(
		<div className="buy-list">
			<h2>Köpes</h2>
			<ul>
				{buyItems.map((item) => 
				<li key={item} >
					<div className="list-item-wrapper" onClick={() => moveToCollected(item)} >
						<ListItem item ={item} />
					</div>
					<button className="delete-btn" onClick={() => deleteItem(item)} ></button>
				</li>
				)}
			</ul>
		</div>
	);
}

export default BuyList;
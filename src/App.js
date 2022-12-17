import './App.css';
import HeaderComp from './components/HeaderComp';
import BuyList from './components/BuyList';
import TakenList from './components/TakenList';
import AddNew from './components/AddNew';
import AskReset from './components/AskReset';
import DuplicateWarning from './components/DuplicateWarning';
import { useState, useEffect } from 'react';

function App() {
	const [buyItems, setBuyItems] = useState([]);
	const [takenItems, setTakenItems] = useState([]);
	const [showReset, setShowReset] = useState(false);
	const [showDuplicate, setShowDuplicate] = useState(false);
	const [duplicatedItem, setDuplicatedItem] = useState("");

	useEffect(() => {
		async function getGroceries() {
			await fetch('/groceries')
			.then(response => response.json())
			.then(data => setBuyItems(data.list))
			.catch(error => console.log(error))
		}
		getGroceries();
	}, []);

	function moveToCollected(itemToMove) {
		let tempTakenList = [];
		if (takenItems) {
			tempTakenList = [...takenItems];
		}
		tempTakenList.push(itemToMove);
		setTakenItems(tempTakenList);

		let tempBuyList = [];
		if (buyItems) {
			tempBuyList = [...buyItems];
		}

		const index = tempBuyList.indexOf(itemToMove);
		if (index > -1) {
			tempBuyList.splice(index, 1);
		}
		setBuyItems(tempBuyList);
	}

	function moveToBuy(itemToMove) {
		let tempBuyList = [];
		if (buyItems) {
			tempBuyList = [...buyItems];
		}
		tempBuyList.push(itemToMove);
		setBuyItems(tempBuyList);

		let tempTakenList = [];
		if (takenItems) {
			tempTakenList = [...takenItems];
		}
		const index = tempTakenList.indexOf(itemToMove);
		if (index > -1) {
			tempTakenList.splice(index, 1);
		}
		setTakenItems(tempTakenList);
	}

	async function deleteItem(itemToDelete) {
		await fetch('/groceries')
			.then(response => response.json())
			.then(data => updateList(data.list, itemToDelete))
			.catch(error => console.log(error))
	}

	async function updateList(list, itemToDelete) {
		let tempBuyList = [];
		if (list) {
			tempBuyList = [...list];
		}
		const index = tempBuyList.indexOf(itemToDelete);
		if (index > -1) {
			tempBuyList.splice(index, 1);
		}
		await fetch(`/groceries`, {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify({list: tempBuyList})});

		console.log(tempBuyList, takenItems);
		
		takenItems.forEach(takenItem => {
			tempBuyList.forEach(buyItem => {
				if (takenItem === buyItem) {
					const itemIndex = tempBuyList.indexOf(buyItem);
					if (itemIndex > -1) {
						tempBuyList.splice(itemIndex, 1);
					}
				}
			});
		});
		setBuyItems(tempBuyList);
		console.log(tempBuyList, takenItems);
	}

	function removeTaken(itemToRemove) {
		let tempTakenList = [];
		if (takenItems) {
			tempTakenList = [...takenItems];
		}
		const index = tempTakenList.indexOf(itemToRemove);
		if (index > -1) {
			tempTakenList.splice(index, 1);
		}
		setTakenItems(tempTakenList);
		deleteItem(itemToRemove);
	}

	async function resetList() {
		const postResponse = await fetch(`/groceries`, {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify( {list: []} )});
		const putData = await postResponse.text();
		console.log(putData);
		setBuyItems([]);
		setTakenItems([]);
		setShowReset(false);
	}

  return (
    <div className="App">
				<section className="top-section">
					<HeaderComp setShowReset={setShowReset} />
					{showReset ? <AskReset setShowReset={setShowReset} resetList={resetList} /> : null }
					<div className="lists">
						{(buyItems.length > 0 || takenItems.length > 0) ? <BuyList moveToCollected={moveToCollected} deleteItem={deleteItem} buyItems={buyItems} /> : null }
						{(buyItems.length > 0 || takenItems.length > 0) ? <TakenList moveToBuy={moveToBuy} removeTaken={removeTaken} takenItems={takenItems} /> : null}
					</div>
				</section>
				<section className="bottom-section">
					{showDuplicate ? <DuplicateWarning duplicatedItem={duplicatedItem} setShowDuplicate={setShowDuplicate} />
					: 
					<AddNew setBuyItems={setBuyItems} setShowDuplicate={setShowDuplicate} setDuplicatedItem={setDuplicatedItem} />
					}
				</section>	
    </div>
  );
}

export default App;

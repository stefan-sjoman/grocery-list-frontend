import './add-new.css';
import { useState } from "react";


const AddNew = ({setBuyItems, setShowDuplicate, setDuplicatedItem}) => {
	const [newItem, setNewItem] = useState("");
	const [inputStyle, setInputStyle] = useState("add-new-input");

	function newInput(event) {
		setNewItem(event.target.value);
		if (event.target.value.length <= 20) {
			setInputStyle("add-new-input");
		} else {
			setInputStyle("add-new-input add-new-input-error");
		}
	}

	function addNewItem() {
		async function getLatestList() {
			await fetch('/groceries')
			.then(response => response.json())
			.then(data => updateToLatestList(data.list))
			.catch(error => console.log(error))
		}
		getLatestList();

		function updateToLatestList(latestList) {
			let tempList = [...latestList];

			let isDuplicated = tempList.includes(newItem);
			if (isDuplicated) {
				setDuplicatedItem(newItem);
				setShowDuplicate(true);
				setNewItem("");
				return;
			} 
			setShowDuplicate(false);

			tempList.push(newItem);
			setNewItem("");
			setBuyItems(tempList);
			postNewItem(tempList);
		}
			
		async function postNewItem(tempList) {
			await fetch(`/groceries`, {method: 'POST', headers: {
				'Content-type': 'application/json'}, body: JSON.stringify({list: tempList})});
		}
	}

	return(
		<section className="add-new-section">
			<input 
				className={inputStyle} 
				type="text" 
				placeholder="Skriv in ny vara..." 
				onChange={newInput} value={newItem}
			/>
			<button className="add-btn" disabled={newItem === "" || newItem.length > 20} onClick={addNewItem}>LÄGG TILL</button>
		</section>
	);
}

export default AddNew;
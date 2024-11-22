import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetching initial data from the server
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleToggleCart(itemId) {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, isInCart: !item.isInCart } : item
    );
    setItems(updatedItems);
  }

  function handleDeleteItem(itemId) {
    const remainingItems = items.filter((item) => item.id !== itemId);
    setItems(remainingItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <h1>Shopping List</h1>
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleCart={handleToggleCart}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
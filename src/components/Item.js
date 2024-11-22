import React from "react";

function Item({ item, onToggleCart, onDeleteItem }) {
  function handleCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((res) => res.json())
      .then(() => onToggleCart(item.id));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDeleteItem(item.id);
        }
      });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleCartClick}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
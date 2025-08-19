import { useCart } from "../context/CartContext.jsx";
import BasketCard from "../components/BasketCard.jsx";
import BasketSideBar from "../components/BasketSideBar.jsx";
import styles from "./ChekoutPage.module.css";

const CheckoutPage = () => {
  const [state, dispatch] = useCart();
  const clickHandler = (type, data) => {
    dispatch({ type, payload: data });
  };

  if (!state.itemsCounter) {
    return (
      <div className={styles.container}>
        <p>Empty</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
        <BasketSideBar state={state} clickHandler={clickHandler} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;

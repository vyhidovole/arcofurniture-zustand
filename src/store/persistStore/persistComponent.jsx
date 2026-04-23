//example
function Cart() {
  const { basket, quantity, incrementProductQuantity } = useCatalogueStore();
  return (
    <div>
      <p>Всего товаров: {quantity}</p>
      {basket.map((p) => (
        <div key={`${p.id}-${p.category}`}>
          {p.name} × {p.quantity}
          <button onClick={() => incrementProductQuantity(p.id, p.category)}>+</button>
        </div>
      ))}
    </div>
  );
}
//Никаких useEffect-ов для первичной загрузки корзины — persist всё сделает за вас.
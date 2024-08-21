import { useEffect, useState } from 'react';
import './App.css';
import { getAllProducts } from '../utils/getProducts';
import Cart from './Components/Cart';
import { data } from 'autoprefixer';

function App() {
  const [products, setProducts] = useState([]);
  const [CardItem, setCardItems] = useState([]);
  const [ShowCardItem, setShowCardItem] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
      const itemsInCart = JSON.parse(localStorage.getItem("cart"))
      if (itemsInCart) {
        setCardItems([...itemsInCart])
      }
  }, []);

  useEffect(() => {
    if (CardItem.length) {
     localStorage.setItem("cart" , JSON.stringify(CardItem));
    }
}, [CardItem]);

  const addCardItem = (item) => {
    const items = [...CardItem];
    const itemInd = items.findIndex((product) => product.id === item.id)
    if (itemInd == -1) {
        items.push(item);
        setCardItems([...items])
    }
  }

  const fetchProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
    };

    const iterateOn = ShowCardItem ? CardItem : products;
  return (
    <div className='container mx-auto'>
      <div className='fixed w-full bg-white h-[100px] top-0 flex items-center justify-center gap-10'>
           <h1 className='text-center text-4xl mt-5 cursor-pointer'>Shopping List</h1>
          <h1
          onClick={() => setShowCardItem(!ShowCardItem)} 
          className='text-center text-4xl mt-5 underline cursor-pointer'
          >
            {ShowCardItem 
            ? "Show All Products "
            : ` Card item ${CardItem.length}`}
          </h1>
      </div>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {iterateOn.map((product) => {
              const isAddedToCart= 
              CardItem.findIndex((item) => item.id === product.id) !== -1;
            return (
              <Cart
              addToCard={() => addCardItem(product)}
              key={product.id}
              item={product}
              showRemoveFromCart={ShowCardItem === true}
              isAddedToCart={isAddedToCart}
              removeFromCart={() => {
                const allOtherItems = CardItem.filter(
                  (item) => item.id !== product.id
                );
                setCardItems(allOtherItems);
              }}
              
              
               />
            )
          })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

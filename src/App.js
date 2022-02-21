import { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } from "./redux";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');

  const [addProduct, {isError}] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const {data = [], isLoading } = useGetGoodsQuery(count);

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({
        name: newProduct,
      }).unwrap();
    }
    setNewProduct('');
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="App">
    <div>
      <input 
      type='text' 
      onChange={({target}) => setNewProduct(target.value)} 
      value={newProduct}
      />
      <button onClick={handleAddProduct}>Add new product</button>
    </div>
    <div>
      <select value={count} onChange={({target}) => setCount(target.value)}>
        <option value=''>All</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
    </div>
    <ul>
    {data.map(({id, name}) => 
      <li key={id} onClick={() => handleDeleteProduct(id)}>{name}</li>
    )}
    </ul>
    </div>
  );
}


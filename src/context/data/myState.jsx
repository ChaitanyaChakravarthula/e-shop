import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  addDoc,
  Query,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  where
} from 'firebase/firestore';

import { fireDB,auth } from '../../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const MyState = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Function to reset product state
  const resetProductState = () => ({
    name: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    inStock: true,
    rating: 0,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [product, setProduct] = useState(resetProductState());
  const [products, setProducts] = useState([]);
  

  // ✅ Add Product Function
  const addProduct = async () => {
    const { name, price, image, category, description } = product;

    if (!name || !price || !image || !category || !description) {
       console.log("All fields are required");
       return;
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'product');
      await addDoc(productRef, product);
      console.log("Product added successfully");

      setTimeout(() => {
        navigate('/admin/products');
      }, 800);

      setProduct(resetProductState()); // Reset product state
    } catch (error) {
      console.error("Error adding product:", error);
      
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Product Data (Real-time Listener)
  const getProductData = () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, 'product'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productArray);
        console.log(productArray);
        
        setLoading(false);
      });
      return unsubscribe; // Cleanup function
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
 }, []);





   // ✅ Edit Product Function
  const edithandle = (item) => {
    setProduct(item);
    console.log(product[0]);
  };
  // ✅ Update Product Function
  const UpdateProduct1 = async () => {
    setLoading(true)
    try {
        await setDoc(doc(fireDB, 'product', product.id), product)
        console.log("Product Updated successfully")
        setTimeout(() => {
            navigate( '/admin/products');
        }, 80);
        getProductData();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}





   // ✅ Delete Product Function
  const deleteProduct = async (item) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'product', item.id))
        console.log('Product Deleted successfully')
        getProductData();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

//cart functionality

let cachedDocId = null;

const getDocumentIdByUid = async () => {
  const user = auth.currentUser;
  if (!user) {
    cachedDocId = null;
    return null;
  }

  if (cachedDocId) return cachedDocId;

  try {
    const usersCollectionRef = collection(fireDB, "users");
    const q = query(usersCollectionRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      cachedDocId = querySnapshot.docs[0].id;
      return cachedDocId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    return null;
  }
};

auth.onAuthStateChanged((user) => {
  if (!user) cachedDocId = null;
});

const addToCart = async (item) => {
  const docId = await getDocumentIdByUid();
  if (!docId) return null;

  try {
    const docRef = doc(fireDB, "users", docId);
    const docSnap = await getDoc(docRef);
    const cart = docSnap.exists() ? docSnap.data().cart || [] : [];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
      item.quantity = item.quantity || 1;
      cart.push(item);
    }

    await setDoc(docRef, { cart }, { merge: true });
    return cart;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return null;
  }
};

const fetchCart = async () => {
  const docId = await getDocumentIdByUid();
  if (!docId) {
    console.log("Failed to find document for the user.");
    return [];
  }

  try {
    const docRef = doc(fireDB, "users", docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().cart || [] : [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

const deleteFromCart = async (itemId) => {
  const docId = await getDocumentIdByUid();
  if (!docId) return null;

  try {
    const docRef = doc(fireDB, "users", docId);
    const docSnap = await getDoc(docRef);
    const cart = docSnap.exists() ? docSnap.data().cart || [] : [];

    const updatedCart = cart.filter(item => item.id !== itemId);
    if (cart.length === updatedCart.length) return null;

    await setDoc(docRef, { cart: updatedCart }, { merge: true });
    return itemId;
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return null;
  }
};

const updateCart = async (updatedItem) => {
  const docId = await getDocumentIdByUid();
  if (!docId) return null;

  try {
    const docRef = doc(fireDB, "users", docId);
    const docSnap = await getDoc(docRef);
    const cart = docSnap.exists() ? docSnap.data().cart || [] : [];

    const itemIndex = cart.findIndex(item => item.id === updatedItem.id);
    if (itemIndex === -1) return null;

    if (cart[itemIndex].quantity !== updatedItem.quantity) {
      cart[itemIndex] = updatedItem;
      await setDoc(docRef, { cart }, { merge: true });
    }

    return updatedItem;
  } catch (error) {
    console.error("Error updating item in cart:", error);
    return null;
  }
};







 // ✅ Search & Filter States
  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

 


  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        products,
        setProduct,
        addProduct,
        edithandle,
        deleteProduct,
        UpdateProduct1,
        searchkey,setSearchkey,filterPrice,setFilterPrice,setFilterType,filterType,
        addToCart,deleteFromCart,fetchCart,updateCart,
        product,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;

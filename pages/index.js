import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
import db from "@/utils/db";
import { Store } from "@/utils/store";
import axios from "axios";
// import Link from "next/link";
import { useContext } from "react";
// import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";

export default function Home({products}) {
  const {state , dispatch} = useContext(Store);
  const {cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity} });
    toast.success("Item added to cart");
  };

  return <Layout title="Home Page">
      <h2 className="h2 my-4">Latest Products</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem product={product} key={product.slug}
        addToCartHandler={addToCartHandler}
        ></ProductItem>
        ))}
    </div>
  </Layout>
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  const featuredProducts = await Product.find({isFeatured: true}).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    }
  }
}
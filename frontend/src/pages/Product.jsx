import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductHD from "../components/ProductHD";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { all_products } = useContext(ShopContext);  // Get all products from context
  const { productId } = useParams();  // Get productId from URL params

  const product = all_products.find((e) => e.id === Number(productId));  // Find product by id

  if (!product) {
    return <div>Product Not Found!!!</div>;  // Handle case where product is not found
  }

  return (
    <section className="max_padd_container py-28">
      <div>
        <ProductHD product={product} />
        <ProductDisplay product={product} />
        <ProductDescription />
        <RelatedProducts />
      </div>
    </section>
  );
};

export default Product;

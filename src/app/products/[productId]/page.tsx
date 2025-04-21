"use client";
import React, { useState, useEffect } from "react";
import { ProductService } from "../../services/products-services";
import { useParams } from "next/navigation";
import styles from "../../styles/ProductDetail.module.css";
import classNames from "classnames";
import RenderStars from '../../components/product/RenderStars';
import AddToCart from '../../components/product/AddToCart';

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const params = useParams();
  // const prodId = params.productId;
  const params = useParams();
const prodId = params.productId ? Number(params.productId) : null;

useEffect(() => {
  const fetchProduct = async () => {
    if (typeof prodId === 'number') {
      try {
        const productData = await ProductService.getProductById(prodId);
        setProduct(productData);
        console.log("product selected in detail page:", productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    } else {
      console.error("Invalid product ID:", prodId);
    }
  };

  fetchProduct();
}, [prodId]);



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await ProductService.getProductById(prodId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (prodId) {
      fetchProduct();
    }
  }, [prodId]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  return (
    <div className="container">
      <div className={classNames("row mb-2", styles.productCard)}>
        <div className="col-5">
          {product.image ? (
            <img src={product.image} className={styles.imagewidth} alt={product.title} />
          ) : (
            <p>Image not available</p>
          )}
        </div>
        <div className="col-7 card-body">
          <h5 className="card-title fs-3 mb-1">{product.title}</h5>
          <p className="card-text fs-5 mb-1 text-muted">{product.description}</p>

          <p className="card-text mb-1">
            <span className="align-top">AED</span>
            <span className="fs-4">{product.price}</span>
          </p>
          <div className="mb-2">
            {product.rating && product.rating.rate && (
              <div className="d-flex align-items-center mb-2">
                <RenderStars rating={product.rating} />
                <span className="ms-2 text-muted">({product.rating.count} ratings)</span>
              </div>
            )}
          </div>
          <hr />
          <div className="mb-2">
                        <AddToCart product={product}/>
          </div>
        </div>
      </div>
    </div>
  );
}
// export default function ProductDetail(props:any) {
//     const [product, setProduct] = useState({});
//     const params = useParams<{ productId: number }>()

//   // const prodId =props.params.productId; 
//   console.log("prod id from url params in detail page",params.productId);
//     useEffect(() =>{
//       const fetchProduct = async () => {
//       try {
//         const productData = await ProductService.getProductById(params.productId);
//         setProduct(productData);
//         console.log("product selected in detail page:", productData); // Log the entire product data
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         // display an error message to the user
//       }
//         };
    
//         fetchProduct();
//       }, [params.productId]);
//       const renderStars = (rating:any) => {
//         const fullStars = Math.floor(rating);
//         const hasHalfStar = rating % 1 !== 0;
//         const stars = [];
    
//         for (let i = 0; i < fullStars; i++) {
//           stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
//         }
    
//         if (hasHalfStar) {
//           stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} className="text-warning" />);
//         }
    
//         const remainingStars = 5 - stars.length;
//         for (let i = 0; i < remainingStars; i++) {
//           stars.push(<FontAwesomeIcon key={fullStars + i + (hasHalfStar ? 1 : 0)} icon={faStar} className="text-secondary" />);
//         }
    
//         return stars;
//       };
//   return (
//     <div className="container">  
//     <div className={classNames("row mb-2", styles.productCard)}>
//           <div className="col-5">
//           {product.image ? (
//     <img src={product.image} className={styles.imagewidth} alt={product.title} />
// ) : (
//     <p>Image not available</p>
// )}
//           </div>
//           <div className="col-7 card-body">
//             <h5 className="card-title fs-3 mb-1">{product.title}</h5>
//             <p className="card-text fs-5 mb-1 text-muted">{product.description}</p>
            
//   <p className="card-text mb-1">
//     <span className="align-top">AED</span><span className="fs-4">{product.price}</span>
//   </p>
//   <div className="mb-2">
//               {product.rating && product.rating.rate && ( // Check if rating exists
//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(product.rating.rate)}
//                   <span className="ms-2 text-muted">({product.rating.count} ratings)</span>
//                 </div>
//               )}
//               </div>
//              <hr/>
//             <div className="mb-2">
//               <button
//     className={classNames("btn btn-dark fs-6", styles.buttonTextSize)} >
//               Add to Cart
//             </button>
//               </div>
//           </div>
//         </div>
//     </div>
//   );
// }


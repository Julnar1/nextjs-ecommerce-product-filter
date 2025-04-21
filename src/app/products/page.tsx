import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { ProductService } from '../services/products-services';
import SidebarFilterOptions from '../components/sidebar-filter/sidebarFilterOptions';

export default async function Products({ searchParams }: any) {
  console.log('Products page(server side) executed');

  // Get query parameters
  const { minRating, minPrice,searchText,category } = await searchParams;
  let filteredProducts = await ProductService.getProducts();

  // Filter by rating
  if (minRating) {
    filteredProducts = filteredProducts.filter(
      (prod: any) => prod.rating.rate >= Number(minRating)
    );
  }

  // Filter by price
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (prod: any) => prod.price >= Number(minPrice)
    );
  }

  // Filter by searchText
  if (searchText) {
    filteredProducts = filteredProducts.filter(
      (prod: any) => prod.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
// Filter by category
if (category) {
  filteredProducts = filteredProducts.filter(
    (prod: any) => prod.category === category
  );
}
  return (
    <div className="container-fluid text-start mb-2 mx-auto">
      <div className="row">
        <div className="col-md-3 pt-4 border-end">
          <SidebarFilterOptions minRating={minRating} minPrice={minPrice} />
        </div>
        <div className="col-md-9">
          {filteredProducts.length > 0 ? (
            <div>
              <h5 className="mt-4 mb-0">Results</h5>
              <div>
                Price and other details may vary based on product size and color.
              </div>
              <div className="d-flex flex-wrap align-items-stretch">
                {filteredProducts.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}



// import React from 'react'
// import ProductCard from '../components/product-card/ProductCard';
// import { ProductService } from '../services/products-services';
// import FilterOptions from '../components/filter-options/FilterOptions';

// export default async function Products( { searchParams }:any) {
//   console.log("Products page(server side) executed");
 
// let filteredProducts:any=[];
// const {min_rating}=await searchParams;
// const {min_price}=await searchParams;
// console.log("min rating and min price:",min_rating,min_price);
//   filteredProducts = await ProductService.getProducts();
//   if(min_rating){
//     filteredProducts=filteredProducts.filter((prod:any)=>{
//       if (min_rating<= prod.rating)
//         return prod;
//     });
//   }
//   if(min_price){
//     filteredProducts=filteredProducts.filter((prod:any)=>{
//       if (min_price<= prod.price)
//         return prod;
//     });
//   }
//   // <FilterOptions  minRating={min_rating} minPrice={min_price}/>
//   return (
//     <div className="container-fluid text-start mb-2 mx-auto">
//       <div className="row">
//         <div className="col-md-3 pt-4 border-end">
//           <h6>Filter By:</h6>
//            <FilterOptions  minRating:any={min_rating} minPrice:any={min_price}/>
//         </div>
//         <div className="col-md-9">
//         {filteredProducts.length > 0 ? (
//         <div>
//         <h5 className="mt-4 mb-0">Results</h5>
//         <div>Price and other details may vary based on product size and color.</div>
//         <div className="d-flex flex-wrap align-items-stretch">
//            {filteredProducts.map((p:any) => {
//               return( <ProductCard key={p.id} product={p}  /> 
//               );
//             }
//             )}
         
//         </div>
//       </div>
//       ):( <p>No products found.</p>)}
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '../../styles/ProductCard.module.css';
import RenderStars from './RenderStars';
import AddToCart from './AddToCart';


export default function ProductCard(props:any) {
    // console.log("Product card component(client side) executed");
    var prod=props.product;
  return (
    <div>
        <div className={classNames("card", styles.productCard)}>
          <Link href={"/products/"+prod.id}>
          <img
            src={prod.image}
            className={classNames("card-img-top object-fit-contain", styles.imageHeight)}
            alt={prod.title}
          />
          </Link>
          <div className="card-body p-0">
            <h6 className={classNames("card-title mb-0 text-secondary",styles.cardTitleHeight)}>
              <Link href={"/products/"+prod.id} className="text-reset text-decoration-none ">{prod.title}</Link>
              </h6>
          <p className="card-text mb-1">
            <span className="align-top">AED</span><span className="fs-4">{prod.price}</span>
          </p>
          <div className="mb-2">
              {prod.rating && prod.rating.rate && ( // Check if rating exists
                <div className="d-flex align-items-center mb-2">
                  <RenderStars rating={prod.rating} />
                  <span className="ms-2 text-muted">({prod.rating.count} ratings)</span>
                </div>
              )}
              </div>
            <AddToCart product={prod}/>
          </div>
        </div>
      </div>
  )
}

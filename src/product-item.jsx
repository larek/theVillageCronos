import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = props => {
  return (
    <div key={props.item.id} className='col-md-12'>
      <div className={props.item.id == props.activeItem ? 'product-item product-item-active' : 'product-item'}>
        <div className='row'>
          <div className='col-6 col-md-4 product-item-description'>
            <img
              src={props.item.img1}
              data-img1={props.item.img1}
              data-img2={props.item.img2}
              className='card-img-top img-fluid'
              onMouseEnter={props.setImg2}
              onMouseLeave={props.setImg1}
            />
          </div>
          <div className='col-6 d-md-none product-item-description'>
            <img
              src={props.item.img2}
              className='card-img-top img-fluid'
            />
          </div>
          <div className='col-12 col-md-8 product-item-description'>
            <div className="product-item-title">{props.item.brand} {props.item.sku}</div>
            <div className="product-item-price">
              <div><s>{props.item.pricediscount == null ? null : props.item.price}</s></div>
              <div>{props.item.pricediscount == null ? props.item.price : props.item.pricediscount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object,
  activeItem: PropTypes.number,
  setImg1: PropTypes.func,
  setImg2: PropTypes.func
};

export default ProductItem;

import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = props => {
  return (
    <div className={props.item.id == props.activeItem ? 'product-item product-item-active' : 'product-item'}>
      <div className='row'>
        <div className='col-6 col-md-4 d-none d-md-block product-item-description'>
          <img
            src={props.item.img1}
            data-img1={props.item.img1}
            data-img2={props.item.img2}
            className='card-img-top img-fluid'
            onMouseEnter={props.setImg2}
            onMouseLeave={props.setImg1}
          />
          <img style={{display: 'none'}} src={props.item.img5} />
        </div>
        <div className='col-6 d-md-none product-item-description'>
          <img
            src={props.item.img1}
            className='card-img-top img-fluid'
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
          <div className='product-item-color'>{props.item.color}</div>
          <div className="product-item-price">
            { props.item.discount !== null ? <span className='discountLabel'>- {props.item.discount}%</span> : null }
            <span className={props.item.pricediscount !== null ? 'redPrice' : null}> {props.item.pricediscount == null ? props.item.price : props.item.pricediscount}</span>
            <span> <s>{props.item.pricediscount == null ? null : props.item.price}</s></span>
          </div>
          <a className='btn btn-secondary btn-sm d-none d-md-block'  target='_blank' href={props.item.link}>Купить в Оптике Кронос</a>
          <a className='btn btn-secondary btn-sm d-block d-md-none'  target='_blank' href={props.item.link}>Купить</a>
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

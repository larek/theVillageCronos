import React from 'react';
import PropTypes from 'prop-types';

const Viewer = props => {
  return !props.currentProduct || !props.mainImage ? false : (<div className="card" id='mainProductView'>
    <div id='canvasContainer' style={{display: props.canvasMode ? 'block' : 'none'}}>
    </div>
    {props.mainImage && !props.canvasMode ? <img id='mainProductImage' className='card-img-top' src={props.mainImage} /> : false}
    <div className="mainProductView-description">
      <div className="mainProductView-title">{props.currentProduct.brand + ' ' + props.currentProduct.sku}</div>
      <div className='mainProductView-color'>{props.currentProduct.color}</div>
      <div className='mainProductView-price'>
        <span>{props.currentProduct.pricediscount == null ? props.currentProduct.price : props.currentProduct.pricediscount}</span>
        <span> <s>{props.currentProduct.pricediscount == null ? null : props.currentProduct.price}</s></span>
      </div>
      <a href={props.currentProduct.link} target='_blank' className="btn btn-dark">Купить в Cronos</a>
    </div>
  </div>);
};

Viewer.propTypes = {
  currentProduct: PropTypes.object,
  mainImage: PropTypes.string,
  canvasMode: PropTypes.bool,
};

export default Viewer;

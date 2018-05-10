import React from 'react';
import PropTypes from 'prop-types';

const Viewer = props => {
  return !props.currentProduct || !props.mainImage ? false : (<div className="card" id='mainProductView'>
    <div id='canvasContainer' style={{display: props.canvasMode ? 'block' : 'none'}}>
    </div>
    {props.mainImage && !props.canvasMode ? <img id='mainProductImage' className='card-img-top' src={props.mainImage} /> : false}
  </div>);
};

Viewer.propTypes = {
  currentProduct: PropTypes.object,
  mainImage: PropTypes.string,
  canvasMode: PropTypes.bool,
};

export default Viewer;

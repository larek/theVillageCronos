import React from 'react';
import PropTypes from 'prop-types';

const FaceList = props => {
  return(
    <div className='row'>
      <div className='col-12'>
        {
          props.currentProduct.img3 ?
            <img 
              className='img-fluid subpreview' 
              onClick={props.setMainImage} 
              src={props.currentProduct.img3} /> : 
            false
        }
      </div>
      <div className='col-12 mt-3'>
        {
          props.currentProduct.img4 ?
            <img 
              className='img-fluid subpreview' 
              onClick={props.setMainImage} 
              src={props.currentProduct.img4} /> : 
            false
        }
      </div>
    </div>
  );
};

FaceList.propTypes = {
  currentProduct: PropTypes.object,
  setMainImage: PropTypes.func
};

export default FaceList;

import React from 'react';
import {render} from 'react-dom';
import Viewer from './viewer.jsx'; 
import FaceList from './face-list.jsx';
import ProductItem from './product-item.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      mainImage: '',
      currentProduct: {},
    };
    this.inputFile = React.createRef();
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetch('/product/get-data').then(r => {
      return r.json();
    }).then(r => {
      this.setState({
        products: r,
        mainImage: r[0].img3,
        currentProduct: r[0]
      });
    });
  }

  setMainImage(e){
    this.setState({
      mainImage: e.target.getAttribute('src'),
    });
  }

  setCurrentProduct(data){
    this.setState({
      mainImage: data.img3,
      currentProduct: data
    });
  }
  
  setImg1(e){
    e.target.src = e.target.dataset.img1;
  }

  setImg2(e){
    e.target.src = e.target.dataset.img2;
  }

  render(){
    let display = this.state.currentProduct ? {display: 'block'} : {display: 'none'};
    return(
      <div className='container' style={display}>
        <div className='row'>
          <div className='col-2'>
            <FaceList 
              currentProduct={this.state.currentProduct} 
              setMainImage={this.setMainImage.bind(this)}
            />
            <div className='row'>
              <div className='col-12 mt-3'>
                <input type='file' style={{display: 'none'}} ref={this.inputFile} onChange={this.fileHandle.bind(this)} />
                <div className='uploadBtn' onClick={this.btnHandle.bind(this)}>
                  <img src='/images/upload-btn.svg' />
                  <span>Загрузить фото</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <Viewer
              mainImage={this.state.mainImage}
              currentProduct={this.state.currentProduct}
            />
          </div>
          <div className="col-5">
            <div className='card product-list'>
              <div className='row'>
                {
                  this.state.products.map(item => {
                    return(
                      <div key={item.id} onClick={this.setCurrentProduct.bind(this, item)}>
                        <ProductItem 
                          item={item}
                          setImg1={this.setImg1.bind(this)}
                          setImg2={this.setImg2.bind(this)}
                          activeItem={this.state.currentProduct.id} />;
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

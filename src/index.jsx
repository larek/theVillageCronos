import React from 'react';
import {render} from 'react-dom';

class App extends React.Component{ // eslint-disable-line no-unused-vars
  constructor(props){
    super(props);
    this.state = {
      products: [],
      mainImage: false,
      img1: false,
      img2: false,
      img3: false,
      img4: false,
      currentProduct: false,
    };
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
        img1: r[0].img1,
        img2: r[0].img2,
        img3: r[0].img3,
        img4: r[0].img4,
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
      img1: data.img1,
      img2: data.img2,
      img3: data.img3,
      img4: data.img4,
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
    return(<div className='container' style={display}>
      <div className='row'>
        <div className='col-2'>
          <div className='row'>
            <div className='col-12'>
              {this.state.img3 ? <img className='img-fluid subpreview' onClick={this.setMainImage.bind(this)} src={this.state.img3} /> : false}
            </div>
            <div className='col-12 mt-3'>
              {this.state.img4 ? <img className='img-fluid subpreview' onClick={this.setMainImage.bind(this)} src={this.state.img4} /> : false}
            </div>
            <div className='col-12 mt-3'>
              <div className='uploadBtn'>
                <img src='/images/upload-btn.svg' />
                <span>Загрузить фото</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="card" id='mainProductView'>
            {this.state.mainImage ? <img className='card-img-top' src={this.state.mainImage} /> : false}
            <div className="mainProductView-description">
              <div className="mainProductView-title">{this.state.currentProduct.brand + ' ' + this.state.currentProduct.sku}</div>
              <div className='mainProductView-color'>{this.state.currentProduct.color}</div>
              <div className='mainProductView-price'>
                <span>{this.state.currentProduct.pricediscount == null ? this.state.currentProduct.price : this.state.currentProduct.pricediscount}</span>
                <span> <s>{this.state.currentProduct.pricediscount == null ? null : this.state.currentProduct.price}</s></span>
              </div>
              <a href={this.state.currentProduct.link} target='_blank' className="btn btn-dark">Купить в Cronos</a>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className='card product-list'>
            <div className='row'>
              {
                this.state.products.map(item => {
                  return (
                    <div key={item.id} onClick={this.setCurrentProduct.bind(this, item)} className='col-md-12'>
                      <div className={this.state.currentProduct.id == item.id ? 'product-item product-item-active' : 'product-item'}>
                        <div className="">
                          <div className='row'>
                            <div className='col-6'>
                              <img 
                                src={item.img1}
                                data-img1={item.img1}
                                data-img2={item.img2}
                                className='card-img-top img-fluid'
                                onMouseEnter={this.setImg2.bind(this)}
                                onMouseLeave={this.setImg1.bind(this)}
                              />
                            </div>
                            <div className='col-6 product-item-description'>
                              <div className="product-item-title">{item.brand}</div>
                              <div className="product-item-title">{item.sku}</div>
                              <div className="product-item-price">
                                <div><s>{item.pricediscount == null ? null : item.price}</s></div>
                                <div>{item.pricediscount == null ? item.price : item.pricediscount}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

render(<App />, document.getElementById('app'));

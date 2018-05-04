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

  render(){
    return(<div className='container'>
      <div className='row'>
        <div className='col-2 mt-3'>
          <div className='row'>
            <div className='col-12'>
              {this.state.img3 ? <img className='img-fluid' onClick={this.setMainImage.bind(this)} src={this.state.img3} /> : false}
            </div>
            <div className='col-12 mt-3'>
              {this.state.img4 ? <img className='img-fluid' onClick={this.setMainImage.bind(this)} src={this.state.img4} /> : false}
            </div>
          </div>
        </div>
        <div className="col-5 mt-3">
          <div className="card" id='mainProductView'>
            {this.state.mainImage ? <img className='card-img-top' src={this.state.mainImage} /> : false}
            <div className="card-body">
              <h5 className="card-title">{this.state.currentProduct.brand + ' ' + this.state.currentProduct.sku}</h5>
              <a href="#" className="btn btn-primary">Купить</a>
            </div>
          </div>
        </div>
        <div className="col-5 mt-3">
          <div className='card product-list'>
            <div className='row'>
              {
                this.state.products.map(item => {
                  return (
                    <div key={item.id} onClick={this.setCurrentProduct.bind(this, item)} className='col-md-12 mt-3'>
                      <div className="product-item">
                        <div className="card-body">
                          <div className='row'>
                            <div className='col-6'>
                              <img src={item.img1} className='card-img-top img-fluid' />
                            </div>
                            <div className='col-6'>
                              <h6 className="card-title">{item.brand}</h6>
                              <h6 className="card-title">{item.sku}</h6>
                              <p>{item.color}</p>
                              <p><span>{item.price}</span><span><s>{item.pricediscount}</s></span></p>
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

import React from 'react';
import {render} from 'react-dom';
import Viewer from './viewer.jsx'; 
import FaceList from './face-list.jsx';
import ProductItem from './product-item.jsx';
import 'exif-js';
import {Croppie} from 'croppie';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      mainImage: '',
      currentProduct: {},
      cropper: {},
      cropMode: false
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

  btnUploadHandle(){
    this.inputFile.current.click();
  }

  fileHandle(){
    let reader = new FileReader();
    reader.onload = r => {
      this.inputFile.current.value = '';
      let cropper  = new Croppie(document.getElementById('croppie'), {
        viewport: { width: 300, height: 450 },
        boundary: { width: 350, height: 500 },
        showZoomer: true,
        enableExif: true,
      });
      cropper.bind({
        url: r.currentTarget.result,
      });
      this.setState({
        cropper: cropper,
        cropMode: true
      });
    };
    reader.readAsDataURL(this.inputFile.current.files[0]);
  }

  getCrop(){
    let _this = this;
    this.state.cropper.result('base64').then(function(blob) {
      _this.state.cropper.destroy();
      _this.setState({
        mainImage: blob,
        cropper: {},
        cropMode: false
      });
    }); 
  }


  render(){
    let display = {display: this.state.currentProduct ? 'block' : 'none'},
      cropContainer = {display: this.state.cropMode ? 'block' : 'none'},
      viewerContainer = {display: this.state.cropMode ? 'none' : false};
    return(
      <div className='container' style={display}>
        <div className='row' style={cropContainer}>
          <div className='col-12 text-center'>
            <div id="croppie"></div>
            <button className='btn btn-dark' onClick={this.getCrop.bind(this)} >Обрезать</button>
          </div>
        </div>
        <div className='row' style={viewerContainer}>
          <div className='col-2'>
            <FaceList 
              currentProduct={this.state.currentProduct} 
              setMainImage={this.setMainImage.bind(this)}
            />
            <div className='row'>
              <div className='col-12 mt-3'>
                <input type='file' ref={this.inputFile} style={{display: 'none'}} onChange={this.fileHandle.bind(this)}/>
                <div className='uploadBtn' onClick={this.btnUploadHandle.bind(this)}>
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

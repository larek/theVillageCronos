import React from 'react';
import {render} from 'react-dom';
import Viewer from './viewer.jsx'; 
import FaceList from './face-list.jsx';
import ProductItem from './product-item.jsx';
import {Croppie} from 'croppie';
import SetSize from './setSize';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      mainImage: '',
      userImage: '',
      currentProduct: {},
      cropper: {},
      cropMode: false,
      canvasMode: false,
      objectParams: {
        top: 140,
        left: 50,
        angle: 0,
        scale: 0.8,
      }
    };
    this.inputFile = React.createRef();
  }

  componentDidMount(){
    this.getData();
    SetSize();
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
      canvasMode: false
    });
  }

  setCurrentProduct(data){
    this.setState({
      mainImage: data.img3,
      currentProduct: data
    });

    this.changeCanvasProduct(data.img5);
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
        userImage: blob,
        cropper: {},
        cropMode: false
      });
      _this.canvas(blob);
    }); 
  }

  canvas(img){
    let _this = this;
    let viewerContainer = document.getElementById('mainProductView');
    let WIDTH = viewerContainer.offsetWidth;
    let HEIGHT = WIDTH * 1.5;

    document.getElementById('canvasContainer').innerText = '';
    let canvasEl = document.createElement('canvas');
    canvasEl.setAttribute('id', 'c');
    canvasEl.width = WIDTH;
    canvasEl.height = HEIGHT;
    document.getElementById('canvasContainer').append(canvasEl);

    this.setState({
      canvas: new fabric.Canvas('c'),
      canvasMode: true,
    });
    
    this.state.canvas.setBackgroundImage(img, this.state.canvas.renderAll.bind(this.state.canvas), {
      scaleX: WIDTH / 300,
      scaleY: HEIGHT / 450,
    });

  }

  changeCanvasProduct(img){
    let _this = this;

    // remove object from Canvas
    this.state.canvas.remove(this.state.canvas.getObjects()[0]);

    // set new object to canvas
    this.setObjectToCanvas(img, () => {
      _this.state.canvas.getObjects()[0].on('mouseup', e => {
        _this.setState({
          objectParams: {
            top: e.target.top,
            left: e.target.left,
            angle: e.target.angle,
            scale: e.target.scaleX,
          }
        });
      });
    });
  }

  setObjectToCanvas(img, callback){
    let _this = this;
    fabric.Image.fromURL(img, r => {
      _this.state.canvas.add(r.set({
        left: _this.state.objectParams.left,
        top: _this.state.objectParams.top,
        angle: _this.state.objectParams.angle,
        scaleX: _this.state.objectParams.scale,
        scaleY: _this.state.objectParams.scale,
      }));
      callback();
    });
  }

  canvasShow(){
    this.setState({
      canvasMode: true
    });
  }

  render(){
    let display = {display: this.state.currentProduct ? 'block' : 'none'},
      cropContainer = {display: this.state.cropMode ? 'block' : 'none'},
      viewerContainer = {display: this.state.cropMode ? 'none' : false};
    //let cropContainer = {display: 'none'}, viewerContainer = {display: 'none'}, display = {display: 'block'};
    return(
      <div id='appContainer' style={display}>
        <div id='viewer' className="viewer">
          <Viewer
            mainImage={this.state.mainImage}
            currentProduct={this.state.currentProduct}
            canvasMode={this.state.canvasMode}
          />
        </div>
        <div id='list' className="list">
          <div className='product-list'>
            <div className='row'>
              {
                this.state.products.map(item => {
                  return(
                    <div key={item.id} onClick={this.setCurrentProduct.bind(this, item)}>
                      <ProductItem 
                        item={item}
                        setImg1={this.setImg1.bind(this)}
                        setImg2={this.setImg2.bind(this)}
                        activeItem={this.state.currentProduct.id} />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
        <div id="detail">
          <div className="row">
            <div className="col-md-6">
              <div className='row'>
                <div className='col-4'>
                  {
                    this.state.currentProduct.img3 ?
                      <img 
                        className='img-fluid subpreview' 
                        onClick={this.setMainImage.bind(this)} 
                        src={this.state.currentProduct.img3} /> : 
                      false
                  }
                </div>
                <div className='col-4 text-center'>
                  {
                    this.state.currentProduct.img4 ?
                      <img 
                        className='img-fluid subpreview' 
                        onClick={this.setMainImage.bind(this)} 
                        src={this.state.currentProduct.img4} /> : 
                      false
                  }
                </div>
                <div className='col-4 text-right'>
                  {this.state.userImage !== '' ? <img className='img-fluid subpreview' onClick={this.canvasShow.bind(this)} src={this.state.userImage} /> : false}
                  <input type='file' ref={this.inputFile} style={{display: 'none'}} onChange={this.fileHandle.bind(this)}/>
                  <div  onClick={this.btnUploadHandle.bind(this)}>
                    <img src='http://placehold.it/100x150' className='img-fluid' />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
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
        </div>
        <div className='row' style={cropContainer}>
          <div className='col-12 text-center'>
            <div id="croppie"></div>
            <button className='btn btn-dark' onClick={this.getCrop.bind(this)} >Обрезать</button>
          </div>
        </div>
        <div className='row' style={viewerContainer}>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

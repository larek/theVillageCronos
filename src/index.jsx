import React from 'react';
import {render} from 'react-dom';
import Viewer from './viewer.jsx'; 
import ProductItem from './product-item.jsx';
import {Croppie} from 'croppie';
import SetSize from './setSize.jsx';
import CreateThumb from './thumb.jsx';


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

    window.onresize = () => {
      SetSize();
    };

    SetSize();
  }

  getData(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/product/get-data', true);
    xhr.onload = response => {
      let r = JSON.parse(response.currentTarget.response);
      this.setState({
        products: r,
        mainImage: r[0].img3,
        currentProduct: r[0]
      });
    };
    xhr.send();
  }

  setMainImage(e){
    this.setState({
      mainImage: e.target.getAttribute('data-img'),
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
      
      //get container width
      let appWidth = document.getElementById('app').offsetWidth;
      let windowHeight = window.innerHeight;
      let croppieWidth, croppieHeight;
      if(appWidth*1.7 > windowHeight){
        croppieHeight = windowHeight*0.7;
        croppieWidth = croppieHeight/1.7;
      }else{
        croppieHeight = appWidth*1.7;
        croppieWidth = appWidth;
      }

      let croppieWidthViewport = croppieWidth-20;
      let croppieHeightViewport = croppieWidthViewport*1.5;

      let cropper  = new Croppie(document.getElementById('croppie'), {
        viewport: { width: croppieWidthViewport, height: croppieHeightViewport },
        boundary: { width: croppieWidth, height: croppieHeight },
        showZoomer: true,
        enableExif: true,
      });

      cropper.bind({
        url: r.currentTarget.result,
      });

      this.setState({
        cropper: cropper,
        cropMode: true,
        croppieWidthViewport: croppieWidthViewport,
        croppieHeightViewport: croppieHeightViewport
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
      
      CreateThumb(_this.state.croppieWidthViewport, blob, r => {
        _this.setState({
          userImage: r
        });
      });
      _this.canvas(blob);
    }); 
  }

  canvas(img){
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
      objectParams: {
        top: HEIGHT*0.2,
        left: WIDTH*0.1,
        angle: 0,
        scale: WIDTH/400,
      }
    });

    let btnUpload = document.getElementById('btnUpload'); 
    let btnWidth = btnUpload.offsetWidth;
    btnUpload.style.width = btnWidth + 'px';
    btnUpload.style.height = btnWidth + 'px';
    btnUpload.style.position = 'absolute';
    btnUpload.style.marginTop = (btnWidth+20)*-1 + 'px';

    this.setState({
      canvas: new fabric.Canvas('c'),
      canvasMode: true,
    });

    //set ScaleX Factor
    let scaleX = WIDTH / this.state.croppieWidthViewport;
    let scaleY = HEIGHT / this.state.croppieHeightViewport;
    
    this.state.canvas.setBackgroundImage(img, this.state.canvas.renderAll.bind(this.state.canvas), {
      scaleX: scaleX,
      scaleY: scaleY,
    });

  }

  changeCanvasProduct(img){

    // remove object from Canvas
    if(this.state.canvas){
      this.removeObjectFromCanvas(() => {
        // set new object to canvas
        this.setObjectToCanvas(img, () => {
          this.state.canvas.getObjects()[0].on('mouseup', e => {
            this.setState({
              objectParams: {
                top: e.target.top,
                left: e.target.left,
                angle: e.target.angle,
                scale: e.target.scaleX,
              }
            });
          });
        });
      });
    }
  }

  removeObjectFromCanvas(callback){
    this.state.canvas.remove(this.state.canvas.getObjects()[0]);
    callback();
  }

  setObjectToCanvas(img, callback){
    fabric.Image.fromURL(img, r => {
      this.state.canvas.add(r.set({
        left: this.state.objectParams.left,
        top: this.state.objectParams.top,
        angle: this.state.objectParams.angle,
        scaleX: this.state.objectParams.scale,
        scaleY: this.state.objectParams.scale,
      }));
      callback();
    });
  }

  canvasShow(){
    this.setState({
      canvasMode: true
    });
  }

  downloadResult(){
    let url = document.getElementById('c').toDataURL();
    let link = document.createElement('a');
    link.href = url;
    link.download = this.state.currentProduct.brand + ' ' + this.state.currentProduct.sku;
    link.click();
  }

  render(){
    let display = {display: this.state.currentProduct ? 'block' : 'none'},
      cropContainer = {display: this.state.cropMode ? 'block' : 'none'},
      viewerContainer = {display: this.state.cropMode ? 'none' : false};
    return(
      <div id='appContainer' style={display}>
        <div style={viewerContainer}>
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
                      <div key={item.id} onClick={this.setCurrentProduct.bind(this, item)} className='col-md-12'>
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
              <div className="col-6">
                <div className='row'>
                  <div className='col-4'>
                    {
                      this.state.currentProduct.img3 ?
                        <img 
                          className='img-fluid subpreview' 
                          onClick={this.setMainImage.bind(this)} 
                          data-img={this.state.currentProduct.img3}
                          src={this.state.currentProduct.img3Thumb} /> : 
                        false
                    }
                  </div>
                  <div className='col-4 text-center'>
                    {
                      this.state.currentProduct.img4 ?
                        <img 
                          className='img-fluid subpreview' 
                          onClick={this.setMainImage.bind(this)} 
                          data-img={this.state.currentProduct.img4}
                          src={this.state.currentProduct.img4Thumb} /> : 
                        false
                    }
                  </div>
                  <div className='col-4 text-right'>
                    <div onClick={this.btnUploadHandle.bind(this)} id='btnUpload'>
                      <img src='/images/btnUpload.jpg' className='img-fluid subpreview' />
                    </div>
                    {
                      this.state.userImage !== '' ? 
                        <img className='img-fluid subpreview' onClick={this.canvasShow.bind(this)} src={this.state.userImage} />:
                        false
                    }
                    <input type='file' ref={this.inputFile} style={{display: 'none'}} onChange={this.fileHandle.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className='row'>
                  <div className='col-4'>
                    {this.state.canvas ? <img src='/images/btnDownload.jpg' className='img-fluid subpreview' onClick={this.downloadResult.bind(this)} /> : null }
                  </div>
                </div>
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

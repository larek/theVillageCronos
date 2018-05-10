export default () => {
  let HEIGHT = window.innerHeight*0.8;
  let CONTAINER = document.getElementById('app').offsetWidth;
  let COEFFICIENT = 1.5;
  let blockWidth, blockHeight;

  if(HEIGHT / COEFFICIENT > CONTAINER / 2){
    blockWidth = CONTAINER / 2;
    blockHeight = CONTAINER*COEFFICIENT / 2;
  }else{
    blockWidth = HEIGHT / COEFFICIENT;
    blockHeight = HEIGHT;
  }

  document.getElementById('viewer').style.width = blockWidth + 'px';
  document.getElementById('viewer').style.height = blockHeight + 'px';

  document.getElementById('list').style.width = blockWidth + 'px';
  document.getElementById('list').style.height = blockHeight + 'px';

  document.getElementById('detail').style.width = blockWidth*2 + 'px';

  document.getElementById('appContainer').style.width = blockWidth*2 + 'px';
  document.getElementById('appContainer').style.margin = '0px auto';
};

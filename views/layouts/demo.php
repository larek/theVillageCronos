<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Village Cronos</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css">
<style>
body{
background: #f1f1f1;
}
#app{
margin: 10px auto;
padding: 0px 20px;
height:500px;
width: 1020px;
}
.product-item {
    border-bottom: 1px solid #dfdfdf;
    cursor: pointer;
    padding: 0px 20px;
}
.product-list{
  height: 680px;
  overflow-y: scroll;
}
.product-item-title {
    font-weight: bold;
}
.product-item-price {
    margin-top: 15px;
    font-size: 1.2em;
}

.product-item-description{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>
</head>
<body>
  <div id="app"></div>
  <script src='/js/bundle.js'></script> 
</body>
</html>

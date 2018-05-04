<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\ProductSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Products';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="product-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create Product', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [

            'ordernumber',
            [
              'attribute' => 'sku',
              'format' => 'raw',
              'value' => function($data){
                return Html::a($data->sku, ['update', 'id' => $data->id]);
              }
            ],
            [
              'attribute' => 'brand',
              'format' => 'raw',
              'value' => function($data){
                return $data->brandDetail->title;
              }
            ],
            [
              'attribute' => 'color',
              'format' => 'raw',
              'value' => function($data){
                return $data->colorDetail->title;
              }
            ],
            'price',
            'discount',
            'active',
            //'pricediscount',
            //'ordernumber',
            //'img1',
            //'img2',
            //'img3',
            //'img4',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>

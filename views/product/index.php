<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\ProductSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Товары';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="product-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [

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
            'ordernumber',
            [
              'attribute' => 'color',
              'format' => 'raw',
              'value' => function($data){
                return $data->colorDetail->title;
              }
            ],
            'price',
            'discount',
        ],
    ]); ?>
</div>

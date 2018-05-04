<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use app\models\Brand;
use app\models\Color;

$brandModel = Brand::find()->orderBy(['title' => SORT_ASC])->all();
$brand = [];
foreach($brandModel as $item){
  $brand[$item->id] = $item->title;
}

$colorModel = Color::find()->orderBy(['title' => SORT_ASC])->all();
$color = [];
foreach($colorModel as $item){
  $color[$item->id] = $item->title;
}

/* @var $this yii\web\View */
/* @var $model app\models\Product */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="product-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'brand')->dropDownList($brand) ?>
     
    <?= $form->field($model, 'color')->dropDownList($color) ?>

    <?= $form->field($model, 'sku')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'price')->textInput() ?>

    <?= $form->field($model, 'discount')->textInput() ?>

    <?= $form->field($model, 'pricediscount')->textInput() ?>

    <?= $form->field($model, 'ordernumber')->textInput() ?>

    <?= $form->field($model, 'slug')->textInput(['maxlength' => true]) ?>
    
    <?= $form->field($model, 'img1')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'img2')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'img3')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'img4')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'link')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'active')->checkbox() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>

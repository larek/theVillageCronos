<?php

namespace app\models;

use Yii;
use app\models\Brand;
use app\models\Color;

/**
 * This is the model class for table "product".
 *
 * @property int $id
 * @property int $brand
 * @property string $sku
 * @property int $color
 * @property int $price
 * @property int $discount
 * @property int $pricediscount
 * @property int $ordernumber
 * @property string $img1
 * @property string $img2
 * @property string $img3
 * @property string $img4
 * @property string $link
 * @property int $active
 * @property string $slug
 */
class Product extends \yii\db\ActiveRecord
{
    /**
     * get brands
     **/
    public function getBrandDetail(){
      return $this->hasOne(Brand::className(), ['id' => 'brand']);
    }

    /**
     * get brands
     **/
    public function getColorDetail(){
      return $this->hasOne(Color::className(), ['id' => 'color']);
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['brand', 'color', 'price', 'ordernumber', 'discount', 'pricediscount', 'active'], 'integer'],
            [['sku', 'img1', 'img2', 'img3', 'img4', 'link', 'slug'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'brand' => 'Brand',
            'sku' => 'Sku',
            'color' => 'Color',
            'price' => 'Price',
            'discount' => 'Discount',
            'pricediscount' => 'Pricediscount',
            'ordernumber' => 'Ordernumber',
            'img1' => 'Img1',
            'img2' => 'Img2',
            'img3' => 'Img3',
            'img4' => 'Img4',
        ];
    }
}

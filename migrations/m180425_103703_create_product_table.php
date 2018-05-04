<?php

use yii\db\Migration;

/**
 * Handles the creation of table `product`.
 */
class m180425_103703_create_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('product', [
            'id' => $this->primaryKey(),
            'brand' => $this->integer(),
            'sku' => $this->string(),
            'color' => $this->integer(),
            'price' => $this->integer(),
            'discount' => $this->integer(),
            'pricediscount' => $this->integer(),
            'ordernumber' => $this->integer(),
            'img1' => $this->string(),
            'img2' => $this->string(),
            'img3' => $this->string(),
            'img4' => $this->string(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('product');
    }
}

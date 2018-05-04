<?php

use yii\db\Migration;

/**
 * Handles adding slug to table `product`.
 */
class m180504_075558_add_slug_column_to_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'slug', $this->string());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'slug');
    }
}

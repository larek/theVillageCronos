<?php

use yii\db\Migration;

/**
 * Handles adding active to table `product`.
 */
class m180504_074211_add_active_column_to_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'active', $this->integer(1));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'active');
    }
}

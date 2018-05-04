<?php

use yii\db\Migration;

/**
 * Handles adding link to table `product`.
 */
class m180504_074102_add_link_column_to_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'link', $this->string());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'link');
    }
}

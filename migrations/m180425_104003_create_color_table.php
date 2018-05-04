<?php

use yii\db\Migration;

/**
 * Handles the creation of table `color`.
 */
class m180425_104003_create_color_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('color', [
            'id' => $this->primaryKey(),
            'title' => $this->string(),
            'hsl' => $this->string(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('color');
    }
}

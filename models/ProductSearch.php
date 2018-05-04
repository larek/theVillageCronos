<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Product;

/**
 * ProductSearch represents the model behind the search form of `app\models\Product`.
 */
class ProductSearch extends Product
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'brand', 'color', 'price', 'discount', 'pricediscount', 'ordernumber'], 'integer'],
            [['sku', 'img1', 'img2', 'img3', 'img4'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Product::find();

        // add conditions that should always apply here
        $query->andWhere(['active' => 1]);
        $query->orderBy(['ordernumber' => SORT_ASC]);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
              'pageSize' => 30
            ]
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'brand' => $this->brand,
            'color' => $this->color,
            'price' => $this->price,
            'discount' => $this->discount,
            'pricediscount' => $this->pricediscount,
            'ordernumber' => $this->ordernumber,
        ]);

        $query->andFilterWhere(['like', 'sku', $this->sku])
            ->andFilterWhere(['like', 'img1', $this->img1])
            ->andFilterWhere(['like', 'img2', $this->img2])
            ->andFilterWhere(['like', 'img3', $this->img3])
            ->andFilterWhere(['like', 'img4', $this->img4]);

        return $dataProvider;
    }
}

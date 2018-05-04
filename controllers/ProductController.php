<?php

namespace app\controllers;

use Yii;
use app\models\Product;
use app\models\ProductSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * ProductController implements the CRUD actions for Product model.
 */
class ProductController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['get-data'],
                        'roles' => ['?'],
                    ]
                ],
            ],
        ];
    }

    /**
     * Lists all Product models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new ProductSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Product model.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Product model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Product();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Product model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['index']);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Product model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Get all product. Return JSON
     **/
    public function actionGetData(){ 
      $model = Product::find()->where(['active' => 1])->orderBy(['ordernumber' => SORT_ASC])->all();
      $data = [];
      foreach($model as $item){
        array_push($data, [
          'id' => $item->id,
          'brand' => $item->brandDetail->title,
          'sku' => $item->sku,
          'color' => $item->colorDetail->title,
          'price' => number_format($item->price, 0, ',', ' ').' руб',
          'pricediscount' => $item->pricediscount == null ? null : number_format($item->pricediscount, 0, ',', ' '). ' руб',
          'discount' => $item->discount,
          'link' => $item->link,
          'img1' => $item->slug !== '' && file_exists($_SERVER['DOCUMENT_ROOT'].'/images/'.$item->slug.'/1.jpg') ? '/images/'.$item->slug.'/1.jpg' : 'https://placehold.it/300x150',
          'img2' => $item->slug !== '' && file_exists($_SERVER['DOCUMENT_ROOT'].'/images/'.$item->slug.'/2.jpg') ? '/images/'.$item->slug.'/2.jpg' : 'https://placehold.it/300x150',
          'img3' => $item->slug !== '' && file_exists($_SERVER['DOCUMENT_ROOT'].'/images/'.$item->slug.'/3.jpg') ? '/images/'.$item->slug.'/3.jpg' : 'https://placehold.it/300x150',
          'img4' => $item->slug !== '' && file_exists($_SERVER['DOCUMENT_ROOT'].'/images/'.$item->slug.'/4.jpg') ? '/images/'.$item->slug.'/4.jpg' : 'https://placehold.it/300x150',
        ]);
      }

      return json_encode($data);
    }

    /**
     * Finds the Product model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Product the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Product::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}

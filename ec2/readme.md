# 接続
ssh -i jphack2019-ec2.pem ubuntu@ec2-13-114-103-68.ap-northeast-1.compute.amazonaws.com

# 仕様

## API URL
```
http://ec2-13-114-103-68.ap-northeast-1.compute.amazonaws.com
```

### GET /api/test
テスト用
{"hello": "world"}が返ってくる

## RaspberryPI用API
### GET /api/pi/status
ステータスを返す
```
{"status": 0, "alert": 0}
```
#### status
* 0...閉まっている
* 1...開いている

#### alert
* 0...アラートが鳴っている
* 1...アラートは鳴っている

## モバイル用API
### GET /api/key/open
鍵がしまっていれば開けるAPI

### GET /api/key/close
鍵が開いていれば閉めるAPI

### GET /api/alert/start
アラートが鳴っていなければ鳴らすAPI

### GET /api/alert/stop
アラートが鳴っていれば鳴らすのを止めるAPI

### GET /api/route
目的地までのルートを導出するAPI
#### query
* origin(開始地点)
* destination(終了地点)
#### status code
* 200 OK
* 400 パラメータ以上
* 404 ルート未発見
* 500 サーバー内エラー
```
[
    {
        "lat": 35.1582477,
        "lng": 136.9636778,
        "instructions": "西に進んで215-四谷に向かう"
    },
    {
        "lat": 35.1608297,
        "lng": 136.950104,
        "instructions": "椙山女学園南（交差点）、を右折する"
    },
    {
        "lat": 35.1609699,
        "lng": 136.9500962,
        "instructions": "椙山女学園南（交差点）、を左折する"
    },
    ...
]
```

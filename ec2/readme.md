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

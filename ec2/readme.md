# 接続
ssh -i jphack2019-ec2.pem ubuntu@ec2-13-114-103-68.ap-northeast-1.compute.amazonaws.com

# 仕様

## RaspberryPI用API
### GET /api/pi/status
ステータスを返す
{"status": "open"}
* open…開ける
* closed…閉じている
* alert…アラートを鳴らす

## モバイル用API

### GET /api/mobile/test
テスト用
{"hello": "world"}が返ってくる

### GET /api/mobile/connected
接続時に呼ばれる

### GET /api/mobile/alert
外れた時に通知

### GET /api/mobile/finished
利用終了時に通知

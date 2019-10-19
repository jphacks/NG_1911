
import urllib.request
import json
import time

BASE_URL = "http://ec2-13-114-103-68.ap-northeast-1.compute.amazonaws.com"

while True:
    req = urllib.request.Request(BASE_URL+"/api/pi/status")
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            print(data["status"])

    except urllib.error.HTTPError as err:
        print(err.code)
    except urllib.error.URLError as err:
        print(err.reason)
    time.sleep(1)

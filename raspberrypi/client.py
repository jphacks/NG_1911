
import urllib.request
import urllib.request
import json

import wiringpi as pi , time

BASE_URL = "http://ec2-13-114-103-68.ap-northeast-1.compute.amazonaws.com"

STATUS_CLOSED = 0
STATUS_OPEN = 1
SYATUS_ERROR = 2

status = 0

pi.wiringPiSetupGpio()

class Motor:
    def __init__(self, OUTPUT_PINS, TIME_SLEEP):
        self.OUTPUT_PINS = OUTPUT_PINS
        self.TIME_SLEEP = TIME_SLEEP
        # GPIOピンを出力モードにする
        for OUTPUT_PIN in self.OUTPUT_PINS:
            pi.pinMode(OUTPUT_PIN, pi.OUTPUT)
    def open(self):
        for k in range(128):
            for p in range (4):
                for i in range (4):
                    if p == i:
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.HIGH)
                    else :
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.LOW)
                time.sleep (self.TIME_SLEEP)
    def close(self):
        for k in range(128):
            for p in range (4):
                for i in range (4):
                    if 3 - p == i:
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.HIGH)
                    else :
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.LOW)
                time.sleep (self.TIME_SLEEP)

class Buzzer:
    def __init__(self, OUTPUT_PIN):
        self.OUTPUT_PIN = OUTPUT_PIN
    def buzz(self):
        pi.digitalWrite (self.OUTPUT_PIN, pi.HIGH)
        time.sleep(0.5)
        pi.digitalWrite (self.OUTPUT_PIN, pi.LOW)


motor = Motor(OUTPUT_PINS=[6 , 13 , 19 , 26], TIME_SLEEP=0.002)
buzzer = Buzzer(OUTPUT_PIN=2)

#

#buzzer.buzz()

BASE_URL = "http://ec2-13-114-103-68.ap-northeast-1.compute.amazonaws.com"

while True:
    req = urllib.request.Request(BASE_URL+"/api/pi/status")
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            print(data)
            if data["status"] == 0 and status != STATUS_CLOSED:
                motor.close()
                status = STATUS_CLOSED
            elif data["status"] == 1 and status != STATUS_OPEN:
                motor.open()
                status = STATUS_OPEN
            elif data["status"] == 2:
                pass

    except urllib.error.HTTPError as err:
        print(err.code)
    except urllib.error.URLError as err:
        print(err.reason)
    time.sleep(1)

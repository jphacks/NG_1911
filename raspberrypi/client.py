import urllib.request
import threading
import json

import wiringpi as pi , time

BASE_URL = "http://ec2-13-114-247-66.ap-northeast-1.compute.amazonaws.com"

pi.wiringPiSetupGpio()

class Motor:
    def __init__(self, OUTPUT_PINS, TIME_SLEEP):
        self.OUTPUT_PINS = OUTPUT_PINS
        self.TIME_SLEEP = TIME_SLEEP
        self.is_open = False
        # GPIOピンを出力モードにする
        for OUTPUT_PIN in self.OUTPUT_PINS:
            pi.pinMode(OUTPUT_PIN, pi.OUTPUT)
    def open(self):
        if self.is_open == True:
            return
        for k in range(128):
            for p in range (4):
                for i in range (4):
                    if p == i:
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.HIGH)
                    else :
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.LOW)
                time.sleep (self.TIME_SLEEP)
        self.is_open = True

    def close(self):
        if self.is_open == False:
            return
        for k in range(128):
            for p in range (4):
                for i in range (4):
                    if 3 - p == i:
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.HIGH)
                    else :
                        pi.digitalWrite (self.OUTPUT_PINS [i], pi.LOW)
                time.sleep (self.TIME_SLEEP)
        self.is_open = False

class Buzzer:
    def __init__(self, OUTPUT_PIN):
        self.OUTPUT_PIN = OUTPUT_PIN
        self.is_buzzing = False
        self.thread = threading.Thread(target=self.buzz)
        self.thread.start()

    def buzz(self):
        while True:
            if self.is_buzzing == True:
                pi.digitalWrite (self.OUTPUT_PIN, pi.HIGH)
            time.sleep(1)
            pi.digitalWrite (self.OUTPUT_PIN, pi.LOW)
            time.sleep(1)
    def start(self):
        if self.is_buzzing == True:
            return

        self.is_buzzing = True
    def stop(self):
        if self.is_buzzing == False:
            return

        pi.digitalWrite (self.OUTPUT_PIN, pi.LOW)

        self.is_buzzing = False

motor = Motor(OUTPUT_PINS=[6 , 13 , 19 , 26], TIME_SLEEP=0.002)
buzzer = Buzzer(OUTPUT_PIN=4)

while True:
    req = urllib.request.Request(BASE_URL+"/api/status")
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            print(data)
            # 鍵の開閉
            if data["status"] == 0:
                motor.close()
            elif data["status"] == 1:
                motor.open()
            # ブザーを鳴らす
            if data["alert"] == 0:
                buzzer.stop()
            elif data["alert"] == 1:
                buzzer.start()

    except urllib.error.HTTPError as err:
        print(err.code)
    except urllib.error.URLError as err:
        print(err.reason)
    time.sleep(1)

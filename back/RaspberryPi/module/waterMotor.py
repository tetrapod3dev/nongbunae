import RPi.GPIO as GPIO
import time
import spidev



#https://m.blog.naver.com/PostView.nhn?blogId=simjk98&logNo=221545072180&proxyReferer=https:%2F%2Fwww.google.com%2F

# Moter Drive 연겶 PIN

A1A = 5
A1B = 6

# 습도 임계치(%)

HUM_THRESHOLD = 20

# 센서를 물에 담갔을때의 토양습도센서 출력 값

HUM_MAX = 0

# 모터 드라이버 초기 설정

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(A1A, GPIO.OUT)
GPIO.output(A1A, GPIO.LOW)
GPIO.setup(A1B, GPIO.OUT)
GPIO.output(A1B, GPIO.LOW)
spi = spidev.SpiDev()

spi.open(0, 0)

spi.max_speed_hz = 500000


# ADC 값을 가져오는 함수

def read_spi_adc(adcChannel):
    adcValue = 0

    buff = spi.xfer2([1, (8 + adcChannel) << 4, 0])
    adcValue = ((buff[1] & 3) << 8) + buff[2]

    return adcValue


# 센서 값을 백분율로 변환하기위한 map 함수

def map(value, min_adc, max_adc, min_hum, max_hum):
    adc_range = max_adc - min_adc
    hum_range = max_hum - min_hum
    scale_factor = float(adc_range) / float(hum_range)
    return min_hum + ((value - min_adc) / scale_factor)


try:

    adcChannel = 0
    while True:
        adcValue = read_spi_adc(adcChannel)

        # 가져온 데이터를 %단위로 변환. 습도높을수록 낮은 값을 반환하므로
        # 100에서 뺴주어 습도가 높을 수록 백분율이 높아지도록 계산

        hum = 100 - int(map(adcValue, HUM_MAX, 1023, 0, 100))

    if hum < HUM_THRESHOLD:  # 임계치보다 수분값이 작으면
        GPIO.output(A1A, GPIO.HIGH)  # 워터펌프 가동
        GPIO.output(A1B, GPIO.LOW)
    else:
        GPIO.output(A1A, GPIO.LOW)
        GPIO.output(A1B, GPIO.LOW)

    time.sleep(0.5)

finally:

GPIO.cleanup()

spi.close()
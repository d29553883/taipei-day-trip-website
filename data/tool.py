import json
from flask import Flask
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="website",
)
mycursor = mydb.cursor()

with open('taipei-attractions.json', 'r',encoding="utf-8") as f:
    p = json.load(f)
    data = p["result"]["results"]
    
    for i in data:
        x = i["file"]
        x = x.replace('https',',https')
        x = x.replace(',https','https',1)
        x = x.split(',')
        img = [c for c in x if 'jpg' or 'JPG' in c ]
        print(img)
        mycursor.execute("INSERT INTO attractions(id, name, category, description, address, transport, mrt, latitude, longitude, images) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",(i["_id"], i["stitle"], i["CAT2"], i["xbody"], i["address"], i["info"], i["MRT"], float(i["latitude"]), float(i["longitude"]), json.dumps(img)))
        mydb.commit()

from flask import *
from cnxpool import cnxpool
import requests
from datetime import datetime 
import os
from dotenv import load_dotenv

load_dotenv()

class OrdersModel:
  def createBook(self):
    try:
      if session != {}:
        cnx=cnxpool.get_connection()
        mycursor=cnx.cursor()			
        partnerKey = os.getenv("PARTNERKEY")
        req = request.get_json()
        prime = req["prime"]
        email = req["email"]
        phone = req["phone"]
        sql = "SELECT attractionid,name,address,image,date,time,price FROM attractions2 WHERE email = %s" 
        adr = (email,)
        mycursor.execute(sql, adr)
        myresult = mycursor.fetchall()
        x = myresult[0]
        x.__str__()
        price = x[6]
        attractionid = x[0]
        name = x[1]
        address = x[2]
        image = x[3]
        date = x[4]
        time = x[5]
        number = datetime.now().strftime('%Y%m%d%H%M%S')
        username = req["username"]
        if phone !="":
          header = {
            "content-type": "application/json",
            "x-api-key": partnerKey
          }
          my_data = {
              "prime": prime,
              "partner_key": partnerKey,
              "merchant_id": "d29553883_CTBC",
              "details":"TapPay Test",
              "amount": price,
              "cardholder": {
                "phone_number": phone,
                "name": username,
                "email": email,
              },
              "remember": True
            }
          response = requests.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', json = my_data, headers=header)
          data = response.json()
          status = data["status"]
          if status == 0:
            sql2 = ("INSERT INTO booking(number,price,attractionid,name,address,image,date,time,username,email,phone,status)" 
            " VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)")		
            adr2 = (number,price,attractionid,name,address,image,date,time,username,email,phone,status)
            mycursor.execute(sql2,adr2)
            cnx.commit()
            return jsonify({
              "data": {
                "number": number,
                "payment": {
                "status":status,
                "message": "付款成功"
              }
              }
            })
          else:
            sql2 = ("INSERT INTO booking(number,price,attractionid,name,address,image,date,time,username,email,phone,status)" 
            " VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)")		
            adr2 = (number,price,attractionid,name,address,image,date,time,username,email,phone,status)
            mycursor.execute(sql2,adr2)
            cnx.commit()
            return jsonify({
              "data": {
                "number": number,
                "payment": {
                "status":status,
                "message": "付款失敗"
              }
              }
            })					
        else:
          return jsonify({
            "error": True,
            "message": "建立失敗，資料沒輸入"
          }),400				
      else:
        return jsonify({
          "error": True,
          "message": "未登入系統，拒絕存取"
        }),403
    except:
      return jsonify({
        "error": True,
        "message": "伺服器內部錯誤"
      }),500	
    finally:
      if cnx.in_transaction:
        cnx.rollback()
      cnx.close()


  def thankyouPage(self,orderNumber):
    try:
      if session != {}:
        cnx=cnxpool.get_connection()
        mycursor=cnx.cursor()
        sql = "SELECT number,price,attractionid,name,address,image,date,time,username,email,phone,status FROM booking WHERE number = %s" 
        adr = (orderNumber,)
        mycursor.execute(sql, adr)
        myresult = mycursor.fetchall()
        x = myresult[0]
        x.__str__()
        number = x[0]
        price = x[1]
        attractionId = x[2]
        name = x[3]
        address = x[4]
        image = x[5]
        date = x[6]
        time = x[7]
        username = x[8]
        email = x[9]
        phone = x[10]
        status = x[11]
        return jsonify({
                "data": {
            "number": number,
            "price": price,
            "trip": {
              "attraction": {
                "id": attractionId,
                "name": name,
                "address": address,
                "image": image
              },
              "date": date,
              "time": time
            },
            "contact": {
              "name": username,
              "email": email,
              "phone": phone
            },
            "status": status
          }			
        })
      else:
          return jsonify({
            "error": True,
            "message": "未登入系統，拒絕存取"
          }),403
    finally:
      if cnx.in_transaction:
        cnx.rollback()
      cnx.close()



orders_model = OrdersModel()

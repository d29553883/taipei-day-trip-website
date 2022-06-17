from flask import *
import ast
from cnxpool import cnxpool


api_booking=Blueprint("api_booking", __name__, template_folder="templates")


@api_booking.route("/api/booking")
def bookinfo():
	cnx=cnxpool.get_connection()
	mycursor=cnx.cursor()
	try:
		if "e_mail" in session :
			email = session["e_mail"]
			sql2 = "SELECT attractionid,name,address,image,date,time,price,email FROM attractions2 WHERE email = %s"
			adr2 = (email,)
			mycursor.execute(sql2, adr2)
			myresult = mycursor.fetchall()
			if myresult != []:
				x = myresult[0]
				x.__str__()
				attractionId = x[0]
				name = x[1]
				address = x[2]
				image = x[3]
				date = x[4]
				time = x[5]
				price = x[6]
				email = x[7]
				return jsonify({
					"data": {
						"attraction": {
						"attractionid": attractionId,
						"name":name,
						"address":address,
						"image" :image
						},
						"date":date,
						"time":time,
						"price":price		
					}
				})
			else:
				return jsonify({
					"data":None
				})
		else:
			return jsonify({
				"error": True,
				"message": "未登入系統，拒絕存取"
			}),403
	finally:
		if cnx.in_transaction:
			cnx.rollback()
		mycursor.close()
		cnx.close()	


@api_booking.route("/api/booking",methods=["POST"])
def createinfo():
	try :
		if "e_mail" in session :
			cnx=cnxpool.get_connection()
			mycursor=cnx.cursor()
			req = request.get_json()
			price = req["price"]
			priceslice = int(price[-5:-1])
			morning = req["morningVlue"]
			y =""	
			if morning == True:
				y ="上半天"
			else:
				y ="下半天"			
			attractionId = req["id"]
			sql = "SELECT name,address,images FROM attractions WHERE id = %s" 
			adr = (attractionId,)
			mycursor.execute(sql, adr)
			myresult = mycursor.fetchall()
			x = myresult[0]
			x.__str__()
			name = x[0]
			address = x[1]
			image =ast.literal_eval(x[2])[0]
			date = req["date"]
			email = session["e_mail"]
			price = priceslice	
			time = y		
			if date !="":
				sql = ("INSERT INTO attractions2(attractionid,name,address,image,date,time,price,email)" 
				" VALUES(%s,%s,%s,%s,%s,%s,%s,%s) ON duplicate KEY UPDATE" 
				"`attractionid`=VALUES(`attractionid`),`name`=VALUES(`name`),`address`=VALUES(`address`),`image`=VALUES(`image`),`date`=VALUES(`date`),`time`=VALUES(`time`),`price`=VALUES(`price`),`email`=VALUES(`email`)")		
				adr = (attractionId,name,address,image,date,time,price,email)	
				mycursor.execute(sql, adr)
				cnx.commit()
				print("預定成功")

				return jsonify({
					"attractionId":attractionId,
					"date": date,
					"time": y,
					"price": priceslice
				})
			else:
				return jsonify({
					"error": True,
					"message": "建立失敗，日期沒輸入"
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


@api_booking.route("/api/booking", methods=["DELETE"])
def deleteBook():
	try:
		if session != {}:
			cnx=cnxpool.get_connection()
			mycursor=cnx.cursor()			
			email = session["e_mail"]
			sql3 = "DELETE FROM attractions2 where email = %s"
			adr3 = (email,)
			mycursor.execute(sql3, adr3)
			cnx.commit()
			return jsonify({
				"ok": True
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
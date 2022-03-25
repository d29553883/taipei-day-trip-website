from flask import *
from flask_cors import CORS
import mysql.connector
import decimal
import ast
import json

from sqlalchemy import true

app=Flask(__name__)
CORS(app)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

app.secret_key="asdgewrwjghjyrirjj"


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="website",
)
mycursor = mydb.cursor()

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        super(DecimalEncoder, self).default(o)
# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

@app.route("/api/attractions")
def api_1():
	page = request.args.get("page")
	keyword = request.args.get("keyword")
	if page != '' and keyword == None:	
		page = int(page)
		page_index = page*12
		sql = "SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images FROM attractions ORDER BY id LIMIT %s, %s"
		adr = (page_index,12)		
		mycursor.execute(sql, adr)
		myresult = mycursor.fetchall()
		names = 'id name category description address transport mrt latitude longitude images'.split()
		data = [{name:value for name, value in zip(names, mr)} for mr in myresult]
		data = json.dumps(data, cls=DecimalEncoder, ensure_ascii=False)
		data = ast.literal_eval(data)
		c = len(data)
		if c <12:
			nextPage = "null"
		else:
			nextPage = page+1	
		for i in data:
			i["images"] = ast.literal_eval(i["images"])
		y = {
			"nextPage":nextPage,
			"data":data
		}
		return jsonify(y)
	elif page != '' and keyword != None:
		page = int(page)
		page_index = page*12
		sql = "SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images FROM attractions WHERE name LIKE %s ORDER BY id LIMIT %s, %s "
		adr = ('%'+keyword+'%',page_index,12)
		nextPage = page+1
		mycursor.execute(sql,adr)
		myresult = mycursor.fetchall()

		names = 'id name category description address transport mrt latitude longitude images'.split()
		data = [{name:value for name, value in zip(names, mr)} for mr in myresult]
		data = json.dumps(data, cls=DecimalEncoder, ensure_ascii=False)
		data = ast.literal_eval(data)
		c = len(data)
		if c <12:
			nextPage = "null"
		else:
			nextPage = page+1
		for i in data:
			i["images"] = ast.literal_eval(i["images"])
		y = {
			"nextPage":nextPage,
			"data":data
		}
		return jsonify(y)
	else:
		a = 1
		x = {
			"error": bool(a),
			"message":"page沒輸入"
		}
		return jsonify(x)

@app.route("/api/attraction/<attractionId>")
def searchid(attractionId):
	sql = "SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images FROM attractions WHERE id = %s"
	i = int(attractionId)
	adr = (i,)
	mycursor.execute(sql,adr)
	myresult = mycursor.fetchall()

	if myresult != []:
		ml = list(myresult[0])
		ml = json.dumps(ml, cls=DecimalEncoder, ensure_ascii=False)
		ml = ast.literal_eval(ml)
		ml[9] = ast.literal_eval(ml[9])
		x = {
			"data":{
				"id":ml[0],
				"name":ml[1],
				"category":ml[2],
				"description":ml[3],
				"address":ml[4],
				"transport":ml[5],
				"mrt":ml[6],
				"latitude":ml[7],
				"longitude":ml[8],
				"images":ml[9]
			}
		}
		return jsonify(x)
	else:
		a = 1
		x = {
			"error": bool(a),
			"message":"景點編號不正確"
		}
		return jsonify(x)



@app.route("/api/user")
def memberinfo():
	if session != {}:
		print(session)
		return jsonify({
			"data":{
				"id":session['id'],
				"name":session['name'],
				"email":session['e_mail']
			}
		})
	else:
		return jsonify({
			"data": None
		})		

	
	

@app.route("/api/user", methods=["POST"])
def signup():
	try:
		req = request.get_json()
		e_mail = req["email"]
		sql = "SELECT email FROM member2 WHERE email = %s"
		adr = (e_mail, )
		mycursor.execute(sql, adr)
		myresult = mycursor.fetchall()
		if myresult != [] :
			response= make_response(jsonify({
				"error": True,
				"message": "此email已存在"
			}),400)

			return response

		else:
			Name = req["name"]
			e_mail = req["email"]
			passWord = req["password"]
			mycursor.execute("INSERT INTO member2(name, email, password) VALUES(%s, %s, %s)",(Name, e_mail, passWord))
			mydb.commit()
			return jsonify({
				"ok": True
			})
	except:
		return jsonify({
			"error": True,
			"message": "伺服器崩潰"
		}),500

		
@app.route("/api/user", methods=["PATCH"])
def signin():
	try:
		req = request.get_json()
		e_mail = req["email"]
		passWord = req["password"]
		sql = "SELECT email,password FROM member2 WHERE email = %s AND password = %s"
		adr = (e_mail,passWord, )
		mycursor.execute(sql, adr)
		myresult = mycursor.fetchall()
		print(myresult)
		if myresult != []:
			sql2 = "SELECT id,name,email FROM member2 WHERE email = %s"
			adr2 = (e_mail,)
			mycursor.execute(sql2, adr2)
			myresult = mycursor.fetchall()
			print(myresult)
			x = myresult[0]
			x.__str__()
			session['id']= int(x[0])
			session["name"]= x[1]
			session["e_mail"]= x[2]
			return jsonify({
				"ok": True
			})
		else:
			return jsonify({
				"error": True,
				"message": "帳號或密碼錯誤"
			}),400
	except:
		return jsonify({
			"error": True,
			"message": "伺服器內部錯誤"
		}),500



@app.route("/api/user", methods=["DELETE"])
def signout():
	del session['id']
	del session['name']
	del session['e_mail']
	print("登出成功")
	return jsonify({
		"ok": True
	})





app.run(host='0.0.0.0',port=3000)
# app.run(port=3000,debug=true)






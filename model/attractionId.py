from flask import *
import json
import ast
import decimal
from cnxpool import cnxpool

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        super(DecimalEncoder, self).default(o)

class AttractionIdModel:
  def searchid(self,attractionId):
    try:
      cnx=cnxpool.get_connection()
      mycursor=cnx.cursor() 
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
    finally:
      if cnx.in_transaction:
        cnx.rollback()
      cnx.close()

attractionId_model = AttractionIdModel()
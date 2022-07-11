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

class AttractionsModel:
  def attractions(self):
    try:
      cnx=cnxpool.get_connection()
      mycursor=cnx.cursor() 
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
    finally:
      if cnx.in_transaction:
        cnx.rollback()
      cnx.close()


attractions_model = AttractionsModel()
from flask import *
from flask_cors import CORS
from api.api_attractions import api_attractions
from api.api_attraction_attractionId import api_attraction_attractionId
from api.api_user import api_user
from api.api_booking import api_booking
from api.api_orders import api_orders

app=Flask(__name__)
CORS(app)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.secret_key="asdgewrwjghjyrirjj"

app.register_blueprint(api_attractions)
app.register_blueprint(api_attraction_attractionId)
app.register_blueprint(api_user)
app.register_blueprint(api_booking)
app.register_blueprint(api_orders)


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




app.run(host='0.0.0.0',port=3000)







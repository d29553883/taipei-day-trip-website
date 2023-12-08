from flask import *
from flask_cors import CORS
from controller.api_attractions import api_attractions
from controller.api_attraction_attractionId import api_attraction_attractionId
from controller.api_user import api_user
from controller.api_booking import api_booking
from controller.api_orders import api_orders
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


app=Flask(__name__)
CORS(app)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config["JWT_SECRET_KEY"] = "super-secret-5iugfd4rs"
app.secret_key="asdgewrwjghjyrirjj"
jwt = JWTManager(app)

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







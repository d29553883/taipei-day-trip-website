from flask import *
from model.attractions import attractions_model

api_attractions=Blueprint("api_attractions", __name__, template_folder="templates")



@api_attractions.route("/api/attractions")
def attractions():
	get_result = attractions_model.attractions()
	return get_result	
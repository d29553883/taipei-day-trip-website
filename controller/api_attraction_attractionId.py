from flask import *
from model.attractionId import attractionId_model


api_attraction_attractionId=Blueprint("api_attraction_attractionId", __name__, template_folder="templates")




@api_attraction_attractionId.route("/api/attraction/<attractionId>")
def searchid(attractionId):
	get_result = attractionId_model.searchid(attractionId)
	return get_result	
from flask import *
from model.booking import booking_model


api_booking=Blueprint("api_booking", __name__, template_folder="templates")


@api_booking.route("/api/booking")
def bookinfo():
	get_result = booking_model.bookinfo()
	return get_result	


@api_booking.route("/api/booking",methods=["POST"])
def createinfo():
	create_result = booking_model.createinfo()
	return create_result	


@api_booking.route("/api/booking", methods=["DELETE"])
def deleteBook():
	delete_result = booking_model.deleteBook()
	return delete_result
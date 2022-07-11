from flask import *
from model.orders import orders_model



api_orders=Blueprint("api_orders", __name__, template_folder="templates")


@api_orders.route("/api/orders",methods=["POST"])
def createBook():
	book_result = orders_model.createBook()
	return book_result


@api_orders.route("/api/orders/<orderNumber>")
def thankyouPage(orderNumber):
	orders_result = orders_model.thankyouPage(orderNumber)
	return orders_result
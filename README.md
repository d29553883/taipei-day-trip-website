# Taipei-day-trip
It's a website project of arranging 1 day trip in Taipei.

## Demo

Here's the website : http://3.220.149.47:3000/

| Account | Password |
| :----:| :----: | 
| test@gmail.com | test |

![image](https://res.cloudinary.com/davidlin/image/upload/v1655449779/taipei-day-trip/%E6%88%AA%E5%9C%961_ju2s42.png)
![image](https://res.cloudinary.com/davidlin/image/upload/v1655450579/taipei-day-trip/%E6%88%AA%E5%9C%965_v1xnlz.png)

## Main Features
* Searching detail information of famous attractions in Taipei
  - Browsing directly
  - Keying keyword to search specific attractions
* Booking the trip
* Paying the order with a credit card

## Tech Stack
* Developing application server by Python Flask
* Realizing RESTful API in all pages which need to communicate with database
  - Using Fetch API in frontend to call APIs
* Storing member data, attraction data, booking data and order data by MySQL
* Session-Based Authentication
* Integrating TapPay payment system
* Deploying application server on AWS EC2 Instance
* Importing Flask Blueprint for managing application easily

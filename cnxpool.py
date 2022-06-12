from mysql.connector import pooling
import os
from dotenv import load_dotenv

load_dotenv()

password = os.getenv("PASSWORD")

dbconfig={
    "host" : "localhost",
    "user" : "root",
    "password" : password ,                                            
    "database" : "website",
    "auth_plugin" : "mysql_native_password"
}

cnxpool=pooling.MySQLConnectionPool(
    pool_name = "mypool",
    pool_size = 20,
    **dbconfig
)
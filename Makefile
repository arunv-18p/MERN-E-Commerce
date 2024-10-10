.SILENT:

all:
	npm start

run_server:
	cd server && npm start

run_client:
	cd client && npm start

db:
	mongod --dbpath=C:\\MongoDB\\data\\db
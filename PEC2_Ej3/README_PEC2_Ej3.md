# Transpilación individual de las clases
## model 
Para comprobar que no había errores y test básico
`tsc -p ./src/models/tsconfig.models.json && node ./dist/models/todo.model.js` 
## service 
Para comprobar que no había errores y test de todas los métodos (forzando una localStorage ficticia)
`tsc -p ./src/services/tsconfig.services.json && node ./dist/services/todo.service.js` 
## view 
Para comprobar que no había errores, sin test
`tsc -p ./src/views/tsconfig.views.json && node ./dist/views/todo.view.js` 
## controller
Para comprobar que no había errores, sin test
`tsc -p ./src/controllers/tsconfig.controllers.json && node ./dist/controllers/todo.controller.js` 
## all *.ts
Transpilar todos los TS
`tsc -p tsconfig.json`
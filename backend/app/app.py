from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Configuración de la base de datos (ejemplo usando MongoDB)
client = MongoClient("mongodb+srv://delfin:FuegoRojo@clusterarqui.2kmjw.mongodb.net/")
db = client["sensores"]
collection = db["lecturas"]

@app.route('/registro-temperatura', methods=['POST'])
def registrar_temperatura():
    data = request.get_json()
    if "sensor" in data and "temperatura" in data:
        # Insertar los datos en la base de datos
        collection.insert_one(data)
        return jsonify({"mensaje": "Lectura registrada correctamente"}), 201
    else:
        return jsonify({"error": "Datos inválidos"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

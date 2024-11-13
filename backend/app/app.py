from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)

# Conexión a MongoDB (asegúrate de que MongoDB esté ejecutándose en tu instancia)
client = MongoClient("mongodb+srv://delfin:FuegoRojo@clusterarqui.2kmjw.mongodb.net/")
db = client['sensores_db']            # Nombre de la base de datos
temperaturas = db['temperaturas']      # Nombre de la colección

@app.route('/registro-temperatura', methods=['POST'])
def registro_temperatura():
    data = request.get_json()
    temperatura = data.get("temperatura")

    if temperatura is None:
        return jsonify({"error": "No se recibió ninguna temperatura"}), 400

    # Crear el registro con la temperatura y la hora
    registro = {
        "temperatura": temperatura,
        "timestamp": datetime.now()
    }
    temperaturas.insert_one(registro)  # Guardar en MongoDB

    return jsonify({"mensaje": "Temperatura registrada correctamente"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

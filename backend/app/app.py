from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS
from bson import ObjectId



app = Flask(__name__)

# Habilitar CORS
CORS(app)

# Conexión a MongoDB
client = MongoClient("mongodb+srv://delfin:FuegoRojo@clusterarqui.2kmjw.mongodb.net/")
db = client['sensores_db']
temperaturas = db['temperaturas']
devices_collection = db.devices
users_collection = db.users

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

# Obtener todos los dispositivos
@app.route('/devices', methods=['GET'])
def get_devices():
    devices = list(devices_collection.find({}, {'_id': 0}))  
    return jsonify(devices)

@app.route('/devices', methods=['POST'])
def add_device():
    data = request.json
    if 'name' not in data:
        return jsonify({"error": "Name is required"}), 400

    # Crear el dispositivo con los campos solicitados
    device = {
        "name": data['name'],
        "register_date": datetime.now().isoformat(),  
        "status": data.get('status', 'active'),       
    }
    
    # Insertar el dispositivo en MongoDB
    result = devices_collection.insert_one(device)

    id_device = str(result.inserted_id)  
    devices_collection.update_one(
        {"_id": result.inserted_id},
        {"$set": {"id_device": id_device}}
    )

    device["_id"] = id_device
    device["id_device"] = id_device

    return jsonify({"message": "Device added successfully", "device": device}), 201


@app.route('/devices/<device_id>', methods=['DELETE'])
def delete_device(device_id):
    # Verificar si el device_id es un ObjectId válido
    if not ObjectId.is_valid(device_id):
        return jsonify({"error": "Invalid device ID"}), 400

    # Si es válido, eliminar el dispositivo
    result = devices_collection.delete_one({'_id': ObjectId(device_id)})
    
    if result.deleted_count > 0:
        return jsonify({"message": "Device deleted successfully"}), 200
    else:
        return jsonify({"error": "Device not found"}), 404
    

@app.route('/user', methods=['POST'])
def add_user():
    data = request.json
    if 'name' not in data or 'password' not in data or 'email' not in data:
        return jsonify({"error": "Name, email, and password are required"}), 400

    hashed_password = data['password']

    user = {
        "name": data['name'],
        "last_name": data.get('last_name', ''),
        "email": data['email'],
        "password": hashed_password,
        "register_date": datetime.now().isoformat(),
        "id_user": str(ObjectId())
    }
    
    users_collection.insert_one(user)
    return jsonify({"message": "User added successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email})

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if user['password'] == password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

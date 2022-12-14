// Conexão com o banco de dados
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

//mongodb.connect('mongodb://localhost/vuejs-crud', {
mongodb.connect('mongodb+srv://demo:12345@cluster0.km3bw0i.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(conn => {
  global.conn = conn.db('vuejs-crud');
  console.log("Conectado MongoDB!");
}).catch((err) => {
  console.error('Error: no se pudo conectar mongo.. ' + err);
});

/**
 * CRUD de usuarios
 */
// Retorna os documentos da collection 'users'
async function findUsers(callback) {
  return await global.conn.collection('users').find({}).toArray(callback);
}

// Insere um novo usuario na collection 'users'
async function insertUser(user, callback) {
  return await global.conn.collection('users').insertOne(user, callback);
}

// Atualiza/edita dados do usuario na collection 'users'
async function updateUser(id, user) {
  return await global.conn.collection('users').updateOne({_id: new ObjectId(id)}, {$set: user});
}

// Deleta um usuario da collection 'users'
async function deleteUser(id) {
  return await global.conn.collection('users').deleteOne({_id: new ObjectId(id)});
}

module.exports = { findUsers, insertUser, deleteUser, updateUser };
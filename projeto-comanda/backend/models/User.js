const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware para criptografar a senha antes de salvar
UserSchema.pre('save', async function() {
    // Se a senha não foi modificada (ex: trocou só o username), não faz nada
    if (!this.isModified('password')) return;

    try {
        // Criptografa a senha com salt de 10 rounds
        this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        throw new Error(err);
    }
    // NOTA: Em funções async, o 'next()' não é necessário!
});

module.exports = mongoose.model('User', UserSchema);
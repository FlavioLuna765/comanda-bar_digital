require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createFirstAdmin() {
    try {
        // 1. Conecta ao MongoDB usando a URL do seu .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔗 Conectado ao MongoDB para criar admin...");

        // 2. Verifica se o admin já existe para não duplicar
        const adminExists = await User.findOne({ username: 'admin' });

        if (!adminExists) {
            // 3. Cria o novo usuário
            // A senha '123' será criptografada automaticamente pelo Model User.js
            const admin = new User({
                username: 'admin',
                password: '123' 
            });

            await admin.save();
            console.log("✅ Usuário 'admin' criado com sucesso!");
            console.log("👤 Usuário: admin");
            console.log("🔑 Senha: 123");
        } else {
            console.log("ℹ️ O usuário 'admin' já existe no banco de dados.");
        }

    } catch (err) {
        console.error("❌ Erro ao criar admin:", err);
    } finally {
        // 4. Fecha a conexão e encerra o script
        mongoose.connection.close();
        process.exit();
    }
}

createFirstAdmin();
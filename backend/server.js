const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 3000;

// Função para carregar dados JSON
const loadJson = (file) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "data", file), "utf-8"));
};

// Rota GET para listar todas as fotos com categorias e tags
app.get("/photos", (req, res) => {
    const photos = loadJson("photos.json");
    const categories = loadJson("categories.json");
    const tags = loadJson("tags.json");

    // Relaciona categorias e tags às fotos
    const photosWithDetails = photos.map(photo => ({
        ...photo,
        shootingCategory: categories.find(cat => cat.id === photo.shootingCategoryId),
        tags: tags.filter(tag => photo.tagIds.includes(tag.id))
    }));

    res.json(photosWithDetails);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

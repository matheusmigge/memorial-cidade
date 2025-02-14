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
    const subcategories = loadJson("subcategories.json");
    const tags = loadJson("tags.json");

    // Relaciona categorias e tags às fotos
    const photosWithDetails = photos.map(photo => ({
        ...photo,
        viewCategory: categories.find(cat => cat.id === photo.viewCategoryId),
        tags: tags.map(tag => {
            // Encontra a categoria da tag
            const category = categories.find(cat => cat.id === tag.categoryId);
    
            // Verifica se essa categoria possui uma subcategoria
            const subcategory = subcategories.find(sub => sub.categoryId === category?.id);
    
            return {
                ...tag,
                iconURL: subcategory ? subcategory.iconURL : category?.iconURL || null
            };
        }).filter(tag => photo.tagIds.includes(tag.id))
    }));
    

    res.json(photosWithDetails);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

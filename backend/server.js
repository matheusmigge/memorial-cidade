const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 3000;

// Função para carregar dados JSON
const loadJson = (file) => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", file), "utf-8")
  );
};

const getDecadesForPhoto = (yearStart, yearEnd, decades) => {
  // Se yearEnd for null, consideramos apenas yearStart
  if (yearEnd === null) {
    return decades.filter(
      (decade) => yearStart >= decade.yearStart && yearStart <= decade.yearEnd
    );
  }

  // Se yearEnd não for null, verifica o intervalo entre yearStart e yearEnd
  return decades.filter((decade) => {
    return (
      (yearStart >= decade.yearStart && yearStart <= decade.yearEnd) ||
      (yearEnd >= decade.yearStart && yearEnd <= decade.yearEnd) ||
      (yearStart <= decade.yearStart && yearEnd >= decade.yearEnd)
    );
  });
};

// Rota GET para listar todas as fotos com categorias e tags
app.get("/photos", (req, res) => {
  const photos = loadJson("photos.json");
  const categories = loadJson("categories.json");
  const subcategories = loadJson("subcategories.json");
  const tags = loadJson("tags.json");
  const decades = loadJson("decades.json");  // Carrega as décadas do arquivo


  const photosWithDetails = photos.map((photo) => {
    const photoViewSubcategory = subcategories.find(
      (sub) => sub.id === photo.viewSubcategoryId
    );

    const photoTags = photo.tagIds
      .map((tagId) => {
        const tag = tags.find((tag) => tag.id === tagId);
        if (tag) {
          const tagCategory = categories.find(
            (category) => category.id === tag.categoryId
          );

          return {
            ...tag,
            category: tagCategory || null,
            categoryId: undefined,
          };
        }
        return null;
      })
      .filter((tag) => tag !== null); // Remove tags que não foram encontradas

    const photoDecades = getDecadesForPhoto(
      photo.yearStart,
      photo.yearEnd,
      decades
    );

    return {
      ...photo, // Mantém as informações originais da foto
      viewSubcategory: photoViewSubcategory || null,
      tags: photoTags,
      decades: photoDecades, // Décadas correspondentes
      // Remove os IDs desnecessários
      viewSubcategoryId: undefined,
      tagIds: undefined,
    };
  });

  res.json(photosWithDetails);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

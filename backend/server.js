const cors = require('cors');
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

// Função para obter as décadas de uma foto
const getDecadesForPhoto = (yearStart, yearEnd, decades) => {
  if (yearEnd === null) {
    return decades.filter(
      (decade) => yearStart >= decade.yearStart && yearStart <= decade.yearEnd
    );
  }

  return decades.filter((decade) => {
    return (
      (yearStart >= decade.yearStart && yearStart <= decade.yearEnd) ||
      (yearEnd >= decade.yearStart && yearEnd <= decade.yearEnd) ||
      (yearStart <= decade.yearStart && yearEnd >= decade.yearEnd)
    );
  });
};

// Função para transformar uma foto em photoWithDetails
const getPhotoWithDetails = (
  photo,
  categories,
  subcategories,
  tags,
  decades
) => {
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
    .filter((tag) => tag !== null);

  const photoDecades = getDecadesForPhoto(
    photo.yearStart,
    photo.yearEnd,
    decades
  );

  return {
    ...photo,
    viewSubcategory: photoViewSubcategory || null,
    tags: photoTags,
    decades: photoDecades,
    viewSubcategoryId: undefined,
    tagIds: undefined,
  };
};

app.use(cors());

// Rota GET para listar todas as fotos com detalhes
app.get("/photos", (req, res) => {
  const photos = loadJson("photos.json");
  const categories = loadJson("categories.json");
  const subcategories = loadJson("subcategories.json");
  const tags = loadJson("tags.json");
  const decades = loadJson("decades.json");

  const photosWithDetails = photos.map((photo) =>
    getPhotoWithDetails(photo, categories, subcategories, tags, decades)
  );

  res.json(photosWithDetails);
});

// Rota GET para buscar uma única foto com detalhes
app.get("/photos/:id", (req, res) => {
  const photos = loadJson("photos.json");
  const categories = loadJson("categories.json");
  const subcategories = loadJson("subcategories.json");
  const tags = loadJson("tags.json");
  const decades = loadJson("decades.json");

  const photoId = Number(req.params.id);
  const photo = photos.find((p) => p.id === photoId);

  if (!photo) {
    return res.status(404).json({ error: "Photo not found" });
  }

  const photoWithDetails = getPhotoWithDetails(
    photo,
    categories,
    subcategories,
    tags,
    decades
  );
  res.json(photoWithDetails);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

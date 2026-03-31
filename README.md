# CMTech Storefront

## Donde editar contenido

Todo el contenido editable esta en:

`src/data/storefront.js`

### Productos y servicios

- Catalogo completo: `catalogItems`
- Destacados: `featuredProducts` (lista de IDs)
- Novedades: `newArrivals` (lista de IDs)

Cada item en `catalogItems` usa este formato:

```
{
  id: 'prd-001',
  type: 'producto' | 'servicio',
  category: 'slug-de-categoria',
  name: 'Nombre del item',
  description: 'Descripcion corta',
  brand: 'Marca (opcional)',
  price: '$ 000.000' | 'Cotizar',
  oldPrice: '$ 000.000 (opcional)',
  badge: 'En oferta',
  stock: 'Disponible 2 (solo productos)',
  image: 'URL de imagen'
}
```

### Categorias

- Lista principal: `categories`

Formato:

```
{
  name: 'Nombre de la categoria',
  image: 'URL de imagen'
}
```

### Hero, banners y textos

- Hero (slider): `heroSlides`
- Banners promocionales: `promoBanners`
- Barra promo superior: `promoText`
- CTA final: `cta`
- Marca: `brand`
- Links superiores: `utilityLinks`

## Donde se renderiza

- Layout: `src/App.jsx`
- Componentes: `src/components/`
- Estilos: `src/App.css` y `src/index.css`

## Desarrollo

```
npm install
npm run dev
```

## Chatbot (respuestas predefinidas)

El chatbot ahora responde con reglas simples (sin backend).

Edita las respuestas en:

`src/data/chatbot-responses.js`

## Guardar chats en Google Sheets (gratis)

1) Crea una hoja en Google Sheets.
2) Ve a **Extensiones > Apps Script** y pega este codigo:

```
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([
    new Date(),
    data.role || '',
    data.message || '',
    data.page || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3) En Apps Script: **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4) Copia el URL del Web App.
5) Agrega en tu `.env`:

```
VITE_SHEETS_WEBHOOK=URL_DEL_WEB_APP
```

6) Reinicia `npm run dev`.

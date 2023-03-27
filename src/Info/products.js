export const products = [
  {
    id: 'G1677744748794',
    defaultModel: 'Model koji se prikazuje',
    defaultModelName: 'Naziv default modela',
    category: 'Kojoj kategoriji pripada',
    subProducts: [
      {
        id: 'S1677744811741',
        // model: 'whiteShirt.glb',
        model: '../meshes/Shirts/whiteShirt.glb',
        modelsName: 'Majca',
        defaultModelName: 'Naziv default modela',
        category: 'Kojoj kategoriji pripada',
        promoName:
          'Ime proizvoda iz promoboxa, za lakse snalazenje oko direktnog proizvoda',
        productsInformation: 'Informacije o proizvodu',
        textures: '100% cotton',
        gender: [
          {
            name: 'Man',
            sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
            colors: [
              {
                boja: 'White',
                mesh: '../meshes/Shirts/whiteShirt.glb',
              },
              {
                boja: 'Black',
                mesh: '../meshes/Shirts/blackShirt.glb',
              },
            ],
          },
          {
            name: 'Woman',
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [
              {
                boja: 'White',
                mesh: '../meshes/Shirts/whiteShirt.glb',
              },
              {
                boja: 'Black',
                mesh: '../meshes/Shirts/blackShirt.glb',
              },
            ],
          },
        ],
        sizes: null,
        price: 'Cena proizvoda',
        discountPrice:
          'Za pocetka null, prvo se gleda discount, ako ima izbacuje se pre price',
        cenaStampe: '1.5e + pdv' || '3e + pdv',
        faces: [
          {
            faceName: 'front',
            picture: '../meshes/Shirts/faces/frontFace.png',
            mesh: '',
            camera: {
              x: 0,
              y: 80,
            },
          },
          {
            faceName: 'back',
            picture: '../meshes/Shirts/faces/backFace.png',
            camera: {
              x: 183,
              y: 80,
            },
          },
          {
            faceName: 'rightSleeve',
            picture: '../meshes/Shirts/faces/rightFace.png',
            camera: {
              x: -90,
              y: 80,
            },
          },
          {
            faceName: 'leftSleeve',
            picture: '../meshes/Shirts/faces/leftFace.png',
            camera: {
              x: 90,
              y: 80,
            },
          },
        ],
        makeYourOwn: false || {
          makeYourOwnModel:
            'Model sa istim informacijama i izgledom samo sa vise stranica za dizajniranje',
          makeYourOwnTextures: 'Niz svih mogucih textura za taj proizvod',
          minQuantity: 'Najmanja moguca specijalna porudzbina',
          sizes: 'Sve velicine za proizvod',
          faces: [
            {
              naziv: 'Prednja',
              mesh: 'Mesh Name prednje stranice',
              camera: {
                x: 'Kordinate za ugao po x',
                y: 'Kordinate za ugao po y',
              },
            },
            {
              naziv: 'Zadnja',
              mesh: 'Mesh Name zadnje stranice',
              camera: {
                x: 'Kordinate za ugao po x',
                y: 'Kordinate za ugao po y',
              },
            },
          ],
        },
      },
    ],
  },
];

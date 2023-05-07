import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Karam Isa',
      email: 'karam_isa@icloud.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Ahmad',
      email: 'ahmad@admin.com',
      password: bcrypt.hashSync('habibi'),
      isAdmin: true,
    },
    {
      name: 'John Doe',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
    products: [
      {
        name: 'Shirt + Shorts',
        slug: 'shirt-shorts',
        category: 'Shirts',
        image: '/images/clothing1.jpeg',
        price: 70,
        brand: 'Habibi',
        rating: 4.5,
        numReviews: 8,
        countInStock: 20,
        description: 'A popular shirt',
        isFeatured: true,
        banner: '',
      },
      {
        name: 'Long Sleeve Shirt',
        slug: 'long-sleeve-shirt',
        category: 'Shirts',
        image: '/images/clothing2.jpeg',
        price: 80,
        brand: 'Habibi Excotics',
        rating: 3.2,
        numReviews: 10,
        countInStock: 20,
        description: 'A popular shirt',
        isFeatured: true,
        banner: '',
      },
      {
        name: 'Long Sleeve White Shirt',
        slug: 'long-sleeve-white-shirt',
        category: 'Shirts',
        image: '/images/clothing3.jpeg',
        price: 90,
        brand: 'Habibi Excotics',
        rating: 4.5,
        numReviews: 3,
        countInStock: 20,
        description: 'A popular shirt',
      }
    ],
  };
  
  export default data;
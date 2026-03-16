import axios from "axios";

const BASE_URL = 'https://mock-api.local/api/v1';

const plantImageIds = [
  "1459411552884-841db9b3cc2a", "1485955900006-10f4d324d411", "1446071103084-c257b5f70672",
  "1463320726281-696a485928c7", "1509423350716-97f9360b4e09", "1416879598556-5c7b5e80811e",
  "1477554193778-95732bb82f7a", "1497250681960-ef046c08a56e", "1512428559087-560fa5ceab42",
  "1491515942468-b7a97fdffbda", "1508022057371-ebd652f14c24", "1555037015-1498966b44ac",
  "1520119330965-cfadddfed5fb", "1514118991756-3b3d4fba7274", "1510283082531-bc6e58046cae",
  "1550989460-0adf9ea622e2", "1489069512306-03c9eb6722d3", "1499986348123-ab3a8de9bb7e",
  "1516942048566-2826cf8a2f5e", "1505066211281-cbbdb32d36d8", "1530304387814-1e03af30485f",
  "1507369986422-26155606e91f", "1484083311634-8dd5490ea3bc", "1495904786722-d2b5a19cb205",
  "1506543781223-993d0fdcaaf8", "1521313627581-19add2bb1dc1", "1542600216-24ebfaec9abf",
  "1522204523626-1b0dfda23558", "1495033878701-a1e4d3a033f2", "1526405898089-0aecc12f9ee9",
  "1512411993217-009146ec7bdf", "1524334005615-5e434f8263fd", "1508015504245-738947b960a5",
  "1487053579477-90c7492c303f", "1506048118641-fcda9581ff23", "1493673272479-a20888b18d9b",
  "1533038590840-1c7efd11fe9c", "1525498128493-278cf83478d1", "1518531933037-91b2f5f228f0",
  "1503814881779-7a5fce4451b6", "1502045585521-39af1a45f9bd", "1498175376592-358051adce68",
  "1508548981440-421733230a10", "1510860840001-389f41b250de", "1485600258071-afbf2e742e47"
];

const mockCategories = [
  { id: 1, title: 'Indoor', count: 33 },
  { id: 2, title: 'Succulent', count: 17 },
  { id: 3, title: 'Cactus', count: 23 },
  { id: 4, title: 'Terrarium', count: 19 },
  { id: 5, title: 'Office plants', count: 12 },
  { id: 6, title: 'Decor plants', count: 25 },
];

const mockProducts = Array.from({ length: 45 }, (_, i) => ({
  id: String(i + 1),
  name: `Plant Species ${i + 1}`,
  price: parseFloat((Math.random() * 50 + 15).toFixed(2)),
  description: 'A beautiful plant for your home or office decoration. This plant thrives in indoor environments and requires minimal care, making it the perfect addition to any living space.',
  image: `https://images.unsplash.com/photo-${plantImageIds[i]}?w=400&h=400&fit=crop`,
  image_url: `https://images.unsplash.com/photo-${plantImageIds[i]}?w=400&h=400&fit=crop`,
  images: [
    `https://images.unsplash.com/photo-${plantImageIds[i]}?w=800&h=800&fit=crop`,
    `https://images.unsplash.com/photo-${plantImageIds[(i + 1) % 45]}?w=800&h=800&fit=crop`,
    `https://images.unsplash.com/photo-${plantImageIds[(i + 2) % 45]}?w=800&h=800&fit=crop`
  ],
  category: mockCategories[i % 6].title
}));

const mockReviews = [
  { id: 1, name: 'Alice', comment: 'Great plant, very healthy! Exactly as described.', rating: 5, date: '2024-02-15' },
  { id: 2, name: 'Bob', comment: 'Looks amazing in my living room. Fast shipping.', rating: 4, date: '2024-02-14' },
  { id: 3, name: 'Charlie', comment: 'The packaging was perfect. Love the color.', rating: 5, date: '2024-02-10' },
  { id: 4, name: 'Diana', comment: 'Arrived very quickly but slight damage to one leaf.', rating: 4, date: '2024-02-08' },
  { id: 5, name: 'Eve', comment: 'Nice packaging, no damage. Would buy again.', rating: 5, date: '2024-02-05' },
  { id: 6, name: 'Frank', comment: 'Loves the window light. It has already grown a bit.', rating: 5, date: '2024-01-29' },
  { id: 7, name: 'Grace', comment: 'Very easy to take care of for a beginner like me.', rating: 5, date: '2024-01-25' },
  { id: 8, name: 'Henry', comment: 'Solid size for the price. Fits my pot perfectly.', rating: 4, date: '2024-01-20' },
  { id: 9, name: 'Ivy', comment: 'Beautiful terrarium addition! Thank you.', rating: 5, date: '2024-01-18' }
];

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(config => {
  config.adapter = async (config) => {
    const url = config.url;
    const params = config.params || {};
    let responseData = null;

    if (url.includes('/categories')) {
      responseData = { data: mockCategories };
    } 
    else if (url.match(/\/products\/\d+\/comments/)) {
      responseData = { data: mockReviews };
    } 
    else if (url.match(/\/products\/\d+/)) {
      const idStr = url.split('/').pop();
      const product = mockProducts.find(p => p.id === idStr || p.id === Number(idStr));
      if (product) {
        responseData = { data: product };
      } else {
        return Promise.reject({ response: { status: 404, data: 'Not found' } });
      }
    } 
    else if (url.includes('/products')) {
      let filtered = mockProducts;
      if (params.category) {
        const catObj = mockCategories.find(c => c.id === params.category || c.id.toString() === params.category.toString());
        if (catObj) {
          filtered = filtered.filter(p => p.category === catObj.title);
        }
      }
      const page = params.page || 1;
      const limit = params.limit || 9;
      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);
      responseData = {
        data: paginated,
        total: filtered.length,
        totalCount: filtered.length
      };
    }

    if (responseData) {
      return {
        data: responseData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config,
        request: {}
      };
    }

    return Promise.reject({ response: { status: 404, data: 'Endpoint not found' } });
  };
  return config;
});

export const fetchProducts = async (page = 1, limit = 9, category = null) => {
  const params = { page, limit };
  if (category) params.category = category;
  const response = await api.get('/products', { params });
  return response.data;
}

export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data || response.data;
}

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
}

export const fetchProductComments = async (productId) => {
  const response = await api.get(`/products/${productId}/comments`);
  return response.data;
}

export const fetchRelatedProducts = async (productId, limit = 5) => {
  const response = await api.get('/products', { params: { limit } });
  return response.data;
}

export default api;

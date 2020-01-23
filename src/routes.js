import { store } from './vuex'
const Home = () => import('./views/Home')
const Login = () => import('./views/Login')
const Search = () => import('./views/Search')
const Product = () => import('./views/Product')
const Category = () => import('./views/Category')
const Dashboard = () => import('./views/admin/Dashboard')
const AdminHandler = () => import('./views/admin/Handler')
const BannerForm = () => import('./views/admin/banners/Form')
const BannerView = () => import('./views/admin/banners/View')
const ProductForm = () => import('./views/admin/products/Form')
const ViewProducts = () => import('./views/admin/products/View')
const CategoryForm = () => import('./views/admin/categories/Form')
const ViewCategories = () => import('./views/admin/categories/View')

function isAutenticated() {
    return store.getters.authenticated;
}

const authGaurd = async (to, from, next) => {
    if (await isAutenticated()) {
        next()
    } else {
        next({ name: 'home' })
    }
}

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product
    },
    {
        path: '/category/:id',
        name: 'category',
        component: Category
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        component: AdminHandler,
        beforeEnter: authGaurd,
        children: [
            {
                path: 'add-product',
                name: 'add_product',
                component: ProductForm,
            },
            {
                path: 'edit-product/:id',
                name: 'edit_product',
                component: ProductForm
            },
            {
                path: 'view-products',
                name: 'view_products',
                component: ViewProducts,
            },
            {
                path: 'add-banner',
                name: 'add_banner',
                component: BannerForm,
            },
            // {
            //     path: 'edit-banner/:id',
            //     name: 'edit_banner',
            //     component: BannerForm
            // },
            {
                path: 'view-banners',
                name: 'view_banners',
                component: BannerView,
            },
            {
                path: 'add-category',
                name: 'add_category',
                component: CategoryForm,
            },
            {
                path: 'edit-category/:id',
                name: 'edit_category',
                component: CategoryForm
            },
            {
                path: 'view-categories',
                name: 'view_categories',
                component: ViewCategories,
            },
            {
                path: '',
                name: 'admin',
                component: Dashboard
            }   
        ]
    }, 
    
]
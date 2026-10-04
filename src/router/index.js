import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { title: 'Entrar', layout: 'blank', public: true },
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/criancas',
    name: 'criancas',
    component: () => import('@/pages/CriancasPage.vue'),
    meta: { title: 'Crianças' },
  },
  {
    path: '/turmas',
    name: 'turmas',
    component: () => import('@/pages/TurmasPage.vue'),
    meta: { title: 'Turmas' },
  },
  {
    path: '/responsaveis',
    name: 'responsaveis',
    component: () => import('@/pages/ResponsaveisPage.vue'),
    meta: { title: 'Responsáveis' },
  },
  {
    path: '/matriculas',
    name: 'matriculas',
    component: () => import('@/pages/MatriculasPage.vue'),
    meta: { title: 'Matrículas' },
  },
  {
    path: '/frequencia',
    name: 'frequencia',
    component: () => import('@/pages/FrequenciaPage.vue'),
    meta: { title: 'Frequência' },
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: () => import('@/pages/ConfiguracoesPage.vue'),
    meta: { title: 'Configurações' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nao-encontrado',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Página não encontrada', layout: 'blank', public: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | io-creches` : 'io-creches'
})

export default router

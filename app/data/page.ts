import type {PageData} from '~/types/page'

export const page: PageData = {
  body: [
    {
      id: 'hero-1',
      component: 'hero-component',
      name: 'Hero Component',
      props: {
        eyebrow: 'Announcing our next round of funding.',
        title: 'Data to enrich your online business',
        subtitle:
          'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      },
    },
    {
      id: 'logo-1',
      component: 'logo-component',
      name: 'Logo Component',
      props: {
        title: 'Logo Component',
      },
    },
  ],
}
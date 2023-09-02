import { useCookies } from '@vueuse/integrations/useCookies'

const experiments = {
  'course-page-mobile-layout': {
    enabled: true,
    variants: ['original', 'v1'],
    default: 'original',
  },
  'course-page-cta-color': {
    enabled: false,
    variants: ['original', 'red', 'blue'],
    default: 'red',
  },
} as const

type ExperimentName = keyof typeof experiments

export default function useExperiment(name: ExperimentName) {
  const exp = experiments[name]

  if (!exp) {
    return 'original'
  }

  if (!exp.enabled) {
    return exp.default
  }

  const cookies = useCookies()

  let variant = cookies.get(`exp.${name}`)
  if (!variant) {
    const randomVariantIndex = Math.floor(Math.random() * exp.variants.length)
    variant = exp.variants[randomVariantIndex]
    cookies.set(`exp.${name}`, variant)
  }

  // @ts-ignore
  window.dataLayer.push({
    event: 'experiment',
    experiment_id: `${name}.${variant}`,
  })

  return variant
}

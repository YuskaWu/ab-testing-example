import { useCookies } from '@vueuse/integrations/useCookies'

const experiments = {
  'course-page-mobile-layout': {
    // 是否要啟用實驗
    enabled: false,
    // 有哪些變體
    variants: ['original', 'v1'],
    // 實驗 disabled 後，預設使用的變體
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

  // experiment name 不存在，返回預設 'original'
  if (!exp) {
    return 'original'
  }

  // 先檢查該實驗是否被啟用，如果是 disabled，直接返回設定的預設值
  if (!exp.enabled) {
    return exp.default
  }

  const cookies = useCookies()

  let variant = cookies.get(`exp.${name}`)
  // 新使用者，還沒設定過 variant
  if (!variant) {
    const randomVariantIndex = Math.floor(Math.random() * exp.variants.length)
    variant = exp.variants[randomVariantIndex]
    cookies.set(`exp.${name}`, variant)
  }

  // @ts-ignore
  window.dataLayer.push({
    event: 'experiment',
    experimentName: `exp.${name}.${variant}`,
  })

  // 送 GTM datalayer event 給 GA4
  // window.dataLayer.push({
  //   event: `exp.${name}.${variant}`
  // })

  return variant
}

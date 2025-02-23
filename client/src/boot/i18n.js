import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { Lang } from 'quasar'


export default ({ app }) => {
  const i18n = createI18n({
    locale: Lang.getLocale(),
    legacy: false,
    messages
  })

  app.use(i18n)
}

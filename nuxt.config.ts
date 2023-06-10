// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap"
        }
      ]
    }
  },
  css: [
    // SCSS file in the project
    '~/assets/sass/reset.sass',
  ],
});

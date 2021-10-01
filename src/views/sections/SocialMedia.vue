<template>
  <v-theme-provider dark>
    <base-section
      id="social"
      class="accent text-center"
      space="56"
    >
      <base-section-heading
        :title="$t('SocialMedia.heading')"
        color="transparent"
      >
        {{ $t('SocialMedia.content') }}
      </base-section-heading>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionNews',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>

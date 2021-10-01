<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Ranking',

    metaInfo: { title: '天梯榜' },

    extends: View,

    mixins: [
      LoadSections([
        'greatRanking-features',
        'ranking-features',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'ranking',
      },
    },
  }
</script>

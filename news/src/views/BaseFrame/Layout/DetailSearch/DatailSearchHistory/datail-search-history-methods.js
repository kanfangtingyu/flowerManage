/**
 * DetailSearchの処理方法
 * @module /src/views/BaseFrame/Layout/DetailSearch/DetailSearchHistory/detail-search-history-methods.js
 * @author IBM CIC
 */

export default {
  methods: {
    onInfoBackShow(item) {
      this.$emit('infoBackShow', item)
    }
  }
}

// behaviors 是用于组件间代码共享的特性。
// 每个behavior可以包含一组属性、数据、生命周期函数和方法，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。
const paginationBehavior = Behavior({
  data: {
    dataArray: [],
    total: 0,
    loadingCenter: false, // 页面请求接口
    loading: false, // 接口是否请求中(包括分页请求)
    noneResult: false,
  },
  methods: {
    setTotal(total) {
      this.data.total = total

      this.setData({
        noneResult: total <= 0,
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    setMoreData(newData) {
      const tempArray = this.data.dataArray.concat(newData)

      this.setData({
        dataArray: tempArray,
      })
    },

    hasMore() {
      return this.getCurrentStart() < this.data.total
    },

    showLoadingCenter() {
      this.setData({
        loadingCenter: true,
      })
    },

    hideLoadingCenter() {
      this.setData({
        loadingCenter: false,
      })
    },

    showPaginationLoading() {
      this.setData({
        loading: true,
      })
    },

    hidePaginationLoading() {
      this.setData({
        loading: false,
      })
    },

    initData() {
      this.setData({
        dataArray: [],
        total: 0,
        'pagination.start': 0,
        noneResult: false,
      })
    },
  },
})

export default paginationBehavior

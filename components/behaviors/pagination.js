// behaviors 是用于组件间代码共享的特性。
// 每个behavior可以包含一组属性、数据、生命周期函数和方法，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。
const paginationBehavior = Behavior({
  data: {
    searchResult: [],
  },
  methods: {
    getCurrentStart() {
      return this.data.searchResult.length
    },
  },
})

export default paginationBehavior

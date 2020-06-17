Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    bookItem: {},
  },

  attached() {
    this.setData({
      bookItem: this.properties.book,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})

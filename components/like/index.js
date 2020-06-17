Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImg: 'images/like.png',
    dislikeImg: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap() {
      const { status } = this.properties

      this.triggerEvent('like', { status: !status }, {})
    },
  },
})

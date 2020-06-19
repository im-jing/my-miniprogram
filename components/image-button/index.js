Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    openType: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e) {
      const userInfo = e.detail.rawData

      if (!userInfo) return
      this.triggerEvent('getMyUserInfo', JSON.parse(userInfo), {})
    },
  },
})

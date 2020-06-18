Component({
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
  data: {
    userInfo: null,
  },

  attached() {
    // this.getAuthSetting()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 判断用户是否授权过
    getAuthSetting() {
      wx.getSetting({
        success: (res) => {
          const authSetting = res.authSetting['scope.userInfo']
          if (authSetting) this.getUserInfo()
        },
      })
    },

    // 获取用户信息
    getUserInfo() {
      wx.getUserInfo({
        success: (res) => {
          console.log(res, '=res=')
          const result = JSON.parse(res.rawData)
          this.setData({
            userInfo: result,
          })
          this.onGetUserInfo()
          // wx.storage
        },
      })
    },
    onGetUserInfo() {
      this.triggerEvent('emitUserInfo', { userInfo: this.data.userInfo }, {})
    },
  },
})

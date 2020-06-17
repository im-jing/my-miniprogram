// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    text: null,
  },

  attached() {
    this.setData({
      text: this.properties.text,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('tapping', {
        text: this.properties.text,
      })
    },
  },
})

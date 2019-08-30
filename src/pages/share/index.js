import Taro, { Component } from '@tarojs/taro'
import { View, Canvas, Button } from '@tarojs/components'
import './index.scss'
import appCodeImage from '../../assets/images/appcode.png'


export default class Index extends Component {

  config = {
    navigationBarTitleText: 'SHARE IT!',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#000',
    backgroundColor: '#000',
  }

  constructor (props) {
    super(props)
    this.systemInfo = Taro.getSystemInfoSync()
    this.windowWidth = this.systemInfo.windowWidth
    this.windowHeight = this.systemInfo.windowHeight
    this.canvasWidth = this.windowWidth * 0.8
    this.canvasHeight = this.windowWidth * 1.05
    this.canvasBorderRadius = 20
    this.appCodeSize = 80
    this.imgSrc = ''
    this.tmpImgPath = ''
    this.saved = false
  }

  componentDidMount () {
    Taro.showShareMenu({
      withShareTicket: false
    })
    this.initializeShareCanvas()
    this.initializeImage()
  }

  onShareAppMessage () {
    return {
      title: '看看二次元的自己是什么样儿~'
    }
  }

  initializeShareCanvas = () => {
    this.canvasId = 'share'
    this.ctx = Taro.createCanvasContext(this.canvasId)
  }

  initializeImage = () => {
    const params = this.$router.params
    console.log(params)
    if (params && params.imgSrc) {
      this.imgSrc = params.imgSrc
    }
    if (this.imgSrc) {
      Taro.getImageInfo({
        src: this.imgSrc,
        success: (res) => {
          if (this.imgSrc.search(/tmp/) === -1) {
            this.imgSrc = res.path
          }
          this.drawOnCanvas()
        }
      })
    } else {
      Taro.showToast({
        title: '我要的图片呢？',
        icon: 'none'
      })
    }
  }

  drawOnCanvas = () => {
    let ctx = this.ctx
    // clip to round the border
    ctx.setLineWidth(0)
    ctx.setFillStyle('white')
    ctx.beginPath()
    ctx.moveTo(this.canvasBorderRadius, 0)
    ctx.lineTo(this.canvasWidth - this.canvasBorderRadius, 0)
    ctx.quadraticCurveTo(this.canvasWidth, 0, this.canvasWidth, this.canvasBorderRadius)
    ctx.lineTo(this.canvasWidth, this.canvasHeight - this.canvasBorderRadius)
    ctx.quadraticCurveTo(this.canvasWidth, this.canvasHeight, this.canvasWidth - this.canvasBorderRadius, this.canvasHeight)
    ctx.lineTo(this.canvasBorderRadius, this.canvasHeight)
    ctx.quadraticCurveTo(0, this.canvasHeight, 0, this.canvasHeight - this.canvasBorderRadius)
    ctx.lineTo(0, this.canvasBorderRadius)
    ctx.quadraticCurveTo(0, 0, this.canvasBorderRadius, 0)
    ctx.fill()
    ctx.closePath()
    ctx.clip()

    // draw anime image
    ctx.drawImage(this.imgSrc, 0, 0, this.canvasWidth, this.canvasWidth)

    // draw miniapp code
    ctx.save()
    ctx.beginPath()
    ctx.setShadow(0, 5, 10, 'rgba(200, 200, 200, 0.8)')
    ctx.arc(this.canvasWidth / 2, this.canvasWidth, this.appCodeSize / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
    ctx.drawImage(appCodeImage, this.canvasWidth / 2 - this.appCodeSize / 2, this.canvasWidth - this.appCodeSize / 2, this.appCodeSize, this.appCodeSize)

    ctx.setFontSize(16)
    ctx.setTextBaseline('middle')
    ctx.setTextAlign('center')
    ctx.setFillStyle('#ef4b4b')
    ctx.fillText('原来二次元的我也很____ 😋', this.canvasWidth / 2, this.canvasWidth + this.appCodeSize * 4 / 5)
    ctx.draw(false, this.saveTempImage)
  }

  saveTempImage = () => {
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.canvasWidth,
      height: this.canvasHeight,
      destWidth: this.canvasWidth,
      destHeight: this.canvasHeight,
      fileType: 'png',
      quality: 1,
      canvasId: this.canvasId,
      success: (res) => {
        this.tmpImgPath = res.tempFilePath
      },
      fail: (err) => {
        console.error(err)
      }
    })
  }

  saveImage = () => {
    if (this.saved) {
      Taro.showToast({
        title: '已经给您保存好啦，真是的',
        icon: 'none'
      })
      return
    }
    if (this.tmpImgPath) {
      Taro.saveImageToPhotosAlbum({
        filePath: this.tmpImgPath,
        success: (res) => {
          console.log(res)
          this.saved = true
          Taro.showToast({
            title: '好啦，快去给大家看看怎么样吧~',
            icon: 'none'
          })
        },
        fail: (err) => {
          console.error(err)
          Taro.showToast({
            title: '受到不明物体攻击，没有保存好 >_<',
            icon: 'none'
          })
        }
      })
    } else {
      Taro.showToast({
        title: '呃，好像保存不了图片呢，重新进来一下试试吧 QAQ',
        icon: 'none'
      })
    }
  }



  render () {
    return (
      <View className='index'>
        <View className='bg'></View>
        <View className='main'>
          <Canvas
            canvasId='share'
            disableScroll
            className='share-canvas'
          ></Canvas>
          <Button className='save-button' onClick={this.saveImage}>保存到相册</Button>
        </View>
      </View>
    )
  }
}

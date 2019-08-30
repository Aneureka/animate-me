import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'

import { get as getGlobalData, set as setGlobalData } from '../../global'
import selfieIcon from '../../assets/images/selfie.png'

import { HOST } from '../../constants'
import { TOKEN } from '../../secret_constants'

export default class ImageHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selfiePath: '',
      uploading: false,
      animePath: '',
    }
  }

  componentDidShow () {
    const imgSrc = getGlobalData('imgSrc')
    if (imgSrc) {
      this.setState({
        selfiePath: imgSrc,
        uploading: true
      }, () => {
        setGlobalData('imgSrc', undefined)
        this.uploadImage()
      })
    }
  }

  uploadImage = () => {
    Taro.uploadFile({
      url: `${HOST}/convert?token=${TOKEN}`,
      filePath: this.state.selfiePath,
      name: 'file',
      success: (res) => {
        if (res.statusCode >= 400) {
          Taro.showToast({
            title: '受到不明物体攻击，好像上传不上了',
            icon: 'none',
            mask: false
          })
        }
        else {
          this.setState({
            animePath: `${HOST}/${res.data}`,
            uploading: false
          })
        }
      },
      error: (err) => {
        console.error(err)
        Taro.showToast({
          title: '网络好像开小差了..',
          icon: 'none',
          mask: false
        })
      }
    })
  }

  handleClick = () => {
    this.setState({
      selfiePath: '',
      uploading: false,
      animePath: '',
    })
    Taro.chooseImage({
      count: 1,
      sizeType: 'original',
      success: (res) => {
        if (res.tempFilePaths.length !== 0) {
          Taro.navigateTo({
            url: `/pages/crop/index?imgSrc=${res.tempFilePaths[0]}`
          })
        }
      }
    })
  }

  handlePreviewResult = () => {
    Taro.previewImage({
      urls: [this.state.animePath],
    })
  }

  shareResult = () => {
    Taro.navigateTo({
      url: `/pages/share/index?imgSrc=${this.state.animePath}`
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='image-picker' onClick={this.handleClick} >
          <Image className='picker-icon' src={selfieIcon} mode='widthFix' />
          <View className='hint'>挑张照片试试吧 🙆‍</View>
        </View>

        {
          this.state.uploading ?
            <View className='loading-area'>
              <Image className='origin-image loadding' src={this.state.selfiePath} />
              <View className='hint'>等一会会儿...</View>
            </View>
            :
            null
        }

        {
          this.state.animePath ?
            <View className='result-area'>
              <Image className='result-image' src={this.state.animePath} mode='widthFix' onClick={this.handlePreviewResult} />
              <Button className='share-result-button' onClick={this.shareResult}>给大家看看怎么样~</Button>
            </View>
            :
            null
        }

      </View>

    )
  }

}

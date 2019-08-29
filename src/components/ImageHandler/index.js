import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import { get as getGlobalData, set as setGlobalData } from '../../global'
import selfieIcon from '../../assets/images/selfie.png'

import { HOST } from '../../constants'

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
    console.log('>>>')
    console.log(imgSrc)
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
      url: `${HOST}/convert`,
      filePath: this.state.selfiePath,
      name: 'file',
      success: (res) => {
        if (res.statusCode >= 400) {
          Taro.showToast({
            title: 'Something went wrong',
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
        Taro.showToast({
          title: err,
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

  render () {
    return (
      <View className='index'>
        <View className='image-picker' onClick={this.handleClick} >
          <Image className='picker-icon' src={selfieIcon} mode='widthFix' />
          <View className='hint'>Upload your selfie here.</View>
        </View>

        {
          this.state.uploading ? 
            <View className='loading-area'>
              <Image className='origin-image loadding' src={this.state.selfiePath} />
              <View className='hint'>Please wait...</View>
            </View>
            :
            null
        }
        
        {
          this.state.animePath ? 
            <View className='result-area' onClick={this.handlePreviewResult}>
              <Image className='result-image' src={this.state.animePath} mode='widthFix' />
            </View>
            :
            null
        }

      </View>
      
    )
  }
  
}
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'
import { set as setGlobalData } from '../../global'
import ImageCropper from '../../components/ImageCropper'


export default class Crop extends Component {

  config = {
    navigationBarTitleText: 'EDIT SELFIE!',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#000',
    backgroundColor: '#000',
  }

  constructor (props) {
    super(props)
    this.state = {
      imgSrc: this.$router.params.imgSrc || '',
    }
  }

  componentDidMount () {
    Taro.showShareMenu({
      withShareTicket: false
    })
  }

  onShareAppMessage () {
    return {
      title: '看看二次元的自己是什么样儿~'
    }
  }

  handleReceiveImage = (imgSrc) => {
    setGlobalData('imgSrc', imgSrc)
    Taro.navigateBack()
  }

  render () {
    return (
      <View className='index'>
        <View className='bg'></View>
        <ImageCropper
          className='image-cropper'
          imageSource={this.state.imgSrc}
          onGetCroppedImage={this.handleReceiveImage}
          fixCuttingFrameRatio
          exportQuality={1}
          background='rgba(0, 0, 0, 0)'
          saveFailedToastText='出了点差错不能保存照片啦 >_<'
          saveButtonText='😘 好了'
        />
        <View className='hint'>选出大头照效果会更好哦~</View>
      </View>
    )
  }
}

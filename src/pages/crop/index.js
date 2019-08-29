import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
          saveFailedToastText='Failed to save cropped image'
          saveButtonText='😘 Done'
        />
        <View className='hint'>Select your avatar and get better result</View>
      </View>
    )
  }
}

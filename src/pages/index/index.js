import Taro, { Component } from '@tarojs/taro'
import { View, Image, Ad } from '@tarojs/components'
import './index.scss'


import ImageHandler from '../../components/ImageHandler';
import portfolioImage from '../../assets/images/portfolio.png'


export default class Index extends Component {

  config = {
    navigationBarTitleText: 'ANIMATE ME!',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#000',
    backgroundColor: '#000',
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

  render () {
    return (
      <View className='index'>
        <View className='bg'></View>
        <View className='intro'>
          <View className='line'>FIND YOURSELF IN</View>
          <View className='line pink'>アニメ 🌸</View>
        </View>
        <View className='image-picker-area'>
          <ImageHandler />
        </View>
        <View className='portfolio-area'>
          <View className='line'>🔆 别人家的例子</View>
          <Image className='portfolio' src={portfolioImage} mode='widthFix'></Image>
        </View>
        <View className='footnote'>
          <View className='line'>风格转换算法来自 Junho Kim 等人的 UGATIT 模型，项目开源地址在这儿 👉 https://github.com/aneureka/animate-me</View>
          <View className='line'>如果你有更好的点子或任何建议，欢迎来聊聊人生 aneureka2@gmail.com</View>
          <View className='line'>我会极力保证你的隐私，你上传的所有图片都不会被泄露哦</View>
        </View>
        <View className='ad-wrapper'>
          <Ad unitId='adunit-eb5e227f68f2270b' style='border-radius: 0.5rem;'></Ad>
        </View>
      </View>
    )
  }
}

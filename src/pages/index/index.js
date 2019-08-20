import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import ImagePicker from '../../components/ImagePicker';

import portfolioImage from '../../assets/images/portfolio.png'

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'ANIMATE ME!',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#000',
    backgroundColor: '#000',
    // backgroundColor: '#f3d3d3',
    
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='bg'></View>
        <View className='intro'>
          <View className='line'>FIND YOURSELF IN</View>
          <View className='line pink'>アニメ 🌸</View>
        </View>
        <View className='image-picker-area'>
          <ImagePicker>
          </ImagePicker>
        </View>
        <View className='portfolio-area'>
          <View className='line'>👇 Cute examples</View>
          <Image className='portfolio' src={portfolioImage} mode='widthFix'></Image>
        </View>
        <View className='footnote'>
          <View className='line'>We are committed to protecting your privacy.</View>
          <View className='line'>This style transfering application is based on the work UGATIT from Junho Kim, et al, and open source at https://github.com/aneureka/animate-me</View>
          <View className='line'>If you have any advice or idea, feel free to contact me via aneureka2@gmail.com</View>
        </View>
      </View>
    )
  }
}

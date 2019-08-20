import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import selfieIcon from '../../assets/images/selfie.png'
import { HOST } from '../../constants'

export default class ImagePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selfiePath: '',
      uploading: false,
      animePath: '',
    }
  }

  handleClick = () => {
    this.setState({
      selfiePath: '',
      uploading: false,
      animePath: '',
    })
    Taro.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: (res) => {
        console.log(res)
        if (res.tempFilePaths.length !== 0) {
          this.setState({
            selfiePath: res.tempFilePaths[0],
            uploading: true
          }, () => {
            // Taro.showToast({
            //   title: '正在生成图片，可能需要几十秒的时间，可以先刷刷朋友圈再过来哦~',
            //   icon: 'none',
            //   mask: false
            // })
            Taro.uploadFile({
              url: `${HOST}/convert`,
              filePath: this.state.selfiePath,
              name: 'file',
              success: (res) => {
                console.log(res)
                if (res.statusCode >= 400) {
                  console.log(res.statusCode)
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
// import Taro, { Component } from '@tarojs/taro'
// import { View, Text, Image, Canvas } from '@tarojs/components'
// import './index.scss'

// export default class ImageCropper extends Component {

//   constructor (props) {
//     super(props)
//     this.state = {
//       info: null,
//       bgBright: true,
//       cutAnimation: true,
//       cutLeft: 0,
//       cutTop: 0,
//       imgSrc: '',
//       originalImgWidth: 0,
//       originalImgHeight: 0,
//       imgWidth: 0,
//       imgHeight: 0,
//       imgLeft: 0,
//       imgTop: 0,
//       scale: 1,
//       angle: 0,
//       canvasWidth: 10,
//       canvasHeight: 10,
//       canvasLeft: 0,
//       canvasTop: 0,
//       exportScale: 1,
//     }
//   }

//   componentDidMount () {
//     this.setState({
//       info: Taro.getSystemInfoSync(),
//       originalImageWidth: this.props.imgWidth,
//       originalImageHeight: this.props.imgHeight,

//     })
//   }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   handleTouchMove = () => {

//   }




//   render () {
//     return (
//       <View className='image-cropper' onTouchMove={this.handleTouchMove}>
//         <View className='main'
//           onTouchStart={this.handleCutTouchStart}
//           onTouchEnd={this.handleCutTouchEnd}
//           onTouchMove={this.handleCutTouchMove}
//           onClick={this.handleCutClick}
//         >
//           <View className='content'>
//             <View className={`content-top bg-gray ${this.state.bgBright ? '' : 'bg-black'}`}
//               style={`height: ${this.state.cutTop}; transition-property: ${this.state.cutAnimation ? '': 'background'}`}
//             />
//             <View className='content-mid'
//               style={`height: ${this.state.height}px`}
//             >
//               <View className={`content-mid-left bg-gray ${this.state.bgBright ? '' : 'bg-black'}`}
//                 style={`width: ${this.state.cutLeft}; transition-property: ${this.state.cutAnimation ? '': 'background'}`}
//               />
//               <View className='content-mid-mid'
//                 style={`width: ${this.state.width}px; height: ${this.state.height}px; transition-duration: .3s; transition-property: ${this.state.cutAnimation ? '': 'background'}`}
//               >
//                 <View className='border border-top-left' />
//                 <View className='border border-top-right' />
//                 <View className='border border-right-top' />
//                 <View className='border border-right-bottom' />
//                 <View className='border border-bottom-right' />
//                 <View className='border border-bottom-left' />
//                 <View className='border border-left-bottom' />
//                 <View className='border border-left-top' />
//               </View>
//               <View className={`content-mid-right bg-gray ${this.state.bgBright ? '' : 'bg-black'}`}
//                 style={`transition-property: ${this.state.cutAnimation ? '': 'background'}`}
//               />
//             </View>
//             <View className={`content-bottom bg-gray ${this.state.bgBright ? '' : 'bg-black'}`}
//               style={`transition-property: ${this.state.cutAnimation ? '': 'background'}`}
//             />
//           </View>
//           <Image onLoad={this.handleImageLoad} onTouchStart={this.handleImageTouchStart} onTouchMove={this.handleImageTouchMove} onTouchEnd={this.handleImageTouchEnd}
//             className='img'
//             src={this.state.imgSrc}
//             style={`width: ${this.state.imgWidth ? this.state.imgWidth + 'px' : 'auto'}; 
//                     height: ${this.state.imgHeight ? this.state.imgHeight + 'px' : 'auto'};
//                     transform: translate3d(${this.state.imgLeft - this.state.imgWidth / 2}px, ${this.state.imgTop - this.state.imgHeight / 2}px, 0) scale(${this.state.scale}) rotate(${this.state.angle}deg);
//                     transition-duration: ${this.state.cutAnimation ? 0.4 : 0}s; `}
//           />
//         </View>
//         <Canvas canvasId='image-cropper'
//           disableScroll
//           className='image-cropper-canvas'
//           style={`width: ${this.state.canvasWidth * this.state.exportScale}px; 
//                   height: ${this.state.canvasHeight * this.state.exportScale}px;
//                   left: ${this.state.canvasLeft}px;
//                   top: ${this.state.canvasTop}px;`}
//         />
//         <Canvas canvasId='image-cropper'
//           disableScroll
//           className='image-cropper-canvas'
//           style={'width: ' + this.state.canvasWidth + 'px; top: ' + this.state.canvasTop + 'px;'}
//         />
//       </View>
//     )
//   }
// }

// ImageCropper.defaultProps = {
//   /**
//    * 图片路径
//    */
//   imgSrc: '',
//   /**
//    * 裁剪框尺寸及限制
//    */
//   height: 200,
//   width: 200,
//   minWidth: 0,
//   minHeight: 0,
//   maxWidth: 300,
//   maxHeight: 300,
//   /**
//    * 裁剪框禁止拖动
//    */
//   disableWidthChange: false,
//   disableHeightChange: false,
//   disableRatio: false,
//   /**
//    * 导出的图片尺寸相对剪裁框的比例
//    */
//   exportScale: 3,
//   /**
//    * 导出的图片质量，范围在 (0, 1] 之间
//    */
//   quality: 1,
//   /**
//    * 裁剪框位置
//    */
//   cutLeft: null,
//   cutTop: null,
//   /**
//    * Canvas 边距，不设置默认不显示
//    */
//   canvasLeft: null,
//   canvasTop: null,
//   /**
//    * 图片尺寸
//    */
//   imgWidth: null,
//   imgHeight: null,
//   /**
//    * 图片缩放比
//    */
//   imgScale: 1,
//   /**
//    * 图片旋转角度
//    */
//   imgAngle: 0,
//   /**
//    * 缩放比限制
//    */
//   minScale: 0.5,
//   maxScale: 2,
//   /**
//    * 是否禁用旋转
//    */
//   disableRotate: false,
//   /**
//    * 是否限制移动范围，即裁剪框是否只能在图片内
//    */
//   limitMove: true
// }

export default function throttle(fn, threshold=1000/40) {
    let _lastExecTime = null
    let context = this
    return function (...args) {
        let _nowTime = new Date().getTime()
        if (_nowTime - Number(_lastExecTime) > threshold || !_lastExecTime) {
            fn.apply(context, args)
            _lastExecTime = _nowTime
        }
    }
}

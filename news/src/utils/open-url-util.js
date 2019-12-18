export function openUrl(urlReq) {
  // formを生成
  let form = document.createElement('form')
  form.target = '_blank'
  form.action = urlReq.url
  form.method = 'POST'

  let param = urlReq.data
  for (let k in param) {
    let key = k
    let val = param[key]

    if (key) {
      var input = document.createElement('input')
      val = val != null ? val : ''

      input.type = 'hidden'
      input.name = key
      input.value = val
      form.appendChild(input)
    }
  }

  // 一時的にbodyへformを追加。サブミット後、formを削除する
  var body = document.getElementsByTagName('body')[0]
  body.appendChild(form)
  form.submit()
  body.removeChild(form)
}

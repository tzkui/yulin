### 对象内参数说明：
title: 表示popup上面显示的文字；
rows: 代表每一项展示的数据。其中：
  1.name和key必填，分别代表左边的文字和传入details的key值
  2.如果有icon，加上iconUrl: 'xxx',
  3.如果字有颜色，加上 colorKey: "xxx"，然后在details传入响应字段
  4.默认是左右布局，如果需要行内布局，加上inline:true
  5.如果有扩展项，在detials传入 rows
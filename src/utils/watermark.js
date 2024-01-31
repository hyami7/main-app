const setWatermark = (text, sourceBody) => {
  let id = Math.random() * 10000 + '-' + Math.random() * 10000 + '/' + Math.random() * 10000;

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }

  let can = document.createElement('canvas');
  can.width = 200; //设置水印之间的左右间距
  can.height = 120; //设置水印之间的上下间距

  let cans = can.getContext('2d');
  cans.rotate((-30 * Math.PI) / 180);
  cans.font = '20px Vedana';
  cans.fillStyle = 'rgba(0, 0, 0, .1)';
  cans.textAlign = 'center';
  cans.textBaseline = 'Middle';
  cans.fillText(text, can.width / 20, can.height);

  let water_div = document.createElement('div');
  water_div.id = id;
  water_div.className = 'watermarkClass';
  water_div.style.pointerEvents = 'none';
  water_div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  if (sourceBody) {
    water_div.style.width = '100%';
    water_div.style.height = '100%';
    sourceBody.appendChild(water_div);
  } else {
    water_div.style.top = '0px';
    water_div.style.left = '0px';
    water_div.style.bottom = '0px';
    water_div.style.right = '0px';
    water_div.style.position = 'fixed';
    water_div.style.zIndex = '100000';
    water_div.style.width = '100%';
    water_div.style.height = '100%';
    document.body.appendChild(water_div);
  }

  return id;
};

/**
 *  @param:
 *  @text == 水印内容
 *  @sourceBody == 水印添加的位置，不传就是body
 * */
export const initWaterMark = (text, sourceBody) => {
  const domArr = Array.from(document.getElementsByClassName('watermarkClass'));
  for (let i = 0; i < domArr.length; i++) {
    const element = domArr[i];
    element.remove();
  }
  if (text == '') {
    return;
  }
  setWatermark(text, sourceBody);
};

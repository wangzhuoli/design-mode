/**
 * 适配器模式，当业务需求发生变动导致数据格式发生变动，使用适配器将新的数据结构适配旧代码
*/

// 旧业务数据结构
const gdAddress = function() {
  const address = [{name: '惠州', id: 1}, {name: '广州', id: 2}];
  return address;
}

const bjAddress = function() {
  const address = [{name: '朝阳', id: 1}, {name: '石家庄', id: 2}];
  return address;
}

const render = (fn) => {
  console.log('render', JSON.stringify(fn()));
}

// 新业务的数据结构
const newGdAddress = function() {
  const address = {1: '惠州', 2: '广州'}
  return address;
}

const newBjAddress = function() {
  const address = {1: '朝阳', 2: '石家庄'}
  return address;
}

// 适配器
const addressAdapter = function(oldAddress) {
  let address = [];
  oldAddress = oldAddress();

  Object.keys(oldAddress).forEach(key => {
    address.push({ name: oldAddress[key], id: parseInt(key) });
  })

  return function() {
    return address;
  }
}

render(gdAddress);
render(addressAdapter(newGdAddress));
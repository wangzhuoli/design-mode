import CryptoJS from 'crypto-js';

/**
 * @desc 高级本地存储类
*/
export default class ProStorage {
  /**
   * @desc 参数 config
   * @param { string } type localStorage | sessionStorage
   * @param { string } prefix 名称前缀 建议：项目名 + 项目版本
   * @param { number } expire 过期时间 以毫秒为单位,不传则为不过期
   * @param { boolean } isEncrypt 是否加密，默认加密
   * @param { boolean } autoRefresh 获取数据时是否自动刷新有效期
   * */ 
  constructor(key, config) {
    this.key = config.prefix ? this.autoAddPrefix(key, config.prefix) : key;
    this.config = {
      type: 'localStorage',
      isEncrypt: true,
      autoRefresh: true,
      ...config
    };
  }
  /**
   * @desc 自动添加前缀
  */
  autoAddPrefix(key, prefix) {
    return prefix + '_' + key;
  }
  /**
   * @desc 加密
  */
  encrypt(value) {
    return CryptoJS.AES.encrypt(value, this.key).toString();
  }
  /**
   * @desc 解密
  */
   decrypt(value) {
    return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
  }
  /**
   * @desc 设置 setStorage
   * @param { any } value 缓存值
   * @param { number | null } expire 缓存过期时间
  */
  setStorage(value) {
    const { type, isEncrypt, expire } = this.config;
    if(value === '' || value === undefined || value === null) {
      value = null;
    }
    if(expire) {
      // 有设置过期时间
      if(isNaN(expire)) {
        // 过期时间必须是数字
        throw new Error('Expire must be a number');
      }
    }
    let data = {
      value
    };
    if(expire) {
      // 有过期时间才添加当前时间戳和过期时间
      data.expire = expire;
      data.time = Date.now();
    }
    // 是否加密数据
    data = isEncrypt ? this.encrypt(JSON.stringify(data)) : JSON.stringify(data);
    window[type].setItem(this.key, data)
  }
  /**
   * @desc 获取 getStorage
  */
  getStorage() {
    const { type, isEncrypt, expire, autoRefresh } = this.config;
    let data = window[type].getItem(this.key);
    data = isEncrypt ? this.decrypt(data) : data;
    data = data ? JSON.parse(data) : null;
    if(data && expire) {
      if(Date.now() - data.time < expire ) {
        // 未过期
        if(autoRefresh) {
          // 自动刷新有效期
          this.setStorage(data.value);
        }
      } else {
        // 过期 删除storage
        this.removeStorage();
        return null;
      }
    }
    return data ? data.value : null;
  }
  /**
   * @desc 删除 removeStorage
  */
   removeStorage() {
    const { type } = this.config;
    window[type].removeItem(this.key);
   }
  /**
   * @desc 是否存在
  */
  hasStorage() {
    const { type } = this.config;
    window[type].removeItem(this.key);
  }
  /**
   * @desc 修改配置 changeConfig
  */
   changeConfig(config) {
    this.config = {
      ...this.config,
      ...config
    }
   }
}

class TestStorage extends ProStorage {
  constructor(key, config) {
    super(key, config);
  }
}

export const testStorage = new TestStorage('test', {expire: 5000, prefix: 'demo_v1.0', type: 'sessionStorage' });


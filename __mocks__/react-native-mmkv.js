class MMKV {
  storage = new Map();

  constructor() {
    return;
  }

  clearAll() {
    this.storage.clear();
  }
  delete(key) {
    this.storage.delete(key);
  }
  set(key, value) {
    this.storage.set(key, value);
  }
  getString(key) {
    const result = this.storage.get(key);
    return typeof result === 'string' ? result : undefined;
  }
  getNumber(key) {
    const result = this.storage.get(key);
    return typeof result === 'number' ? result : undefined;
  }
  getBoolean(key) {
    const result = this.storage.get(key);
    return typeof result === 'boolean' ? result : undefined;
  }
  getAllKeys() {
    Array.from(this.storage.keys());
  }
  contains(key) {
    this.storage.has(key);
  }
  recrypt() {
    console.warn('Encryption is not supported in mocked MMKV instances!');
  }
}

export {MMKV};

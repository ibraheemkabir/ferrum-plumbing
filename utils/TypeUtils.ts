
export class TypeUtils {
  static bufferToHex (buffer: ArrayBuffer) {
    // tslint:disable-next-line:no-magic-numbers
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async meomize<T>(dis: any, field: string, provider: () => Promise<T>) {
    if (!dis[field]) {
      const v = await provider();
      dis[field] = v;
    }
    return dis[field];
  }
}

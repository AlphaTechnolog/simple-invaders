export class Timer {
  constructor() {
    this.scheduler = { value: undefined }
  }

  async sleep(s) {
    return new Promise(resolve => {
      if (!this.scheduler.value || timeinfo.timestamp - this.scheduler.value >= s * 1000) {
        resolve()
        this.scheduler.value = timeinfo.timestamp
      }
    })
  }
}

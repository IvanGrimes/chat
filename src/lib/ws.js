export class WS {
  constructor(url) {
    this.retryCount = 0;
    this.queue = []
    this.ready = false
    this.listeners = []

    if (url) {
      this.socket = this.createSocket(url)
    }
  }

  setUrl(url) {
    if (this.socket && this.socket.url !== url) {
      this.socket.close()

      this.socket = null
    }

    if (!this.socket) {
      this.socket = this.createSocket(url)
    }

    return this
  }

  createSocket(url) {
    const socket = new WebSocket(url)

    socket.onopen = () => {
      this.ready = true;

      this.queue.forEach(data => {
        if (this.ready) {
          this.socket.send(data)
        }
      })
    }

    socket.onmessage = (ev) => {
      this.emit(JSON.parse(ev.data))
    }

    socket.onclose = () => {
      this.ready = false
    }

    socket.onerror = () => {
      this.ready = false

      if (this.retryCount < 5) {
        this.retryCount += 1

        setTimeout(() => {
          this.socket = this.createSocket(url)
        }, 1500)
      }
    }

    return socket
  }

  send(data) {
    const json = JSON.stringify(data)
    console.log(this)

    if (this.ready) {
      this.socket.send(json)
    } else {
      this.queue.push(json)
    }
  }

  on(listener) {
    this.listeners.push(listener)

    return () => this.off(listener)
  }

  off(listener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  emit(data) {
    this.listeners.forEach(listener => listener(data))
  }
}

export const beepAlerta = (tipo) => {
    if (tipo) {
      const beep = new AudioContext()
      const alerta = beep.createOscillator()
  
      alerta.type = 'triangle'
      alerta.connect(beep.destination)
      alerta.start()
  
      setTimeout(function () {
        alerta.stop()
      }, 100)
    } else {
      const beep = new AudioContext()
      const alerta = beep.createOscillator()
  
      alerta.frequency.value = 987.8;
      alerta.connect(beep.destination)
      alerta.start()
  
      setTimeout(function () {
        alerta.stop()
      }, 300)
    }
  }
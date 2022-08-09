import * as gpiop from 'rpi-gpio';

export async function listAll(req) {
  gpiop.setup(7, gpiop.DIR_OUT)
    .then(() => {
        return gpiop.write(7, true)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })
  await sleep(4000);
  gpiop.setup(7, gpiop.DIR_OUT)
    .then(() => {
        return gpiop.write(7, false)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })

  return 'Not setup yet'
}


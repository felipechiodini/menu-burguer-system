export const requestPermission = (callback) => {
  try {
    navigator.geolocation.getCurrentPosition(callback)
  } catch (error) {
    alert('erro')
  }
}
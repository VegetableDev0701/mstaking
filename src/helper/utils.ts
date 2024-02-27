import { DEFAULT_COLLECTION_IMG } from "@/constants";
export const MS2Period = (cms: number) => {
  console.log(cms)
  // let seconds = Math.floor(cms / 1000);
  let seconds = cms;
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24)
  let months = Math.floor(days / 30)
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  days = days % 30
  return (months > 0 ? months + 'month' : '') + ' ' +  
    (days > 0? (days + 'days') : '') + ' ' + 
    (hours > 0? (hours + 'hours') : '') + ' ' +
    (minutes > 0 ? (minutes + 'mins') : '') + ' ' +
    (seconds > 0 ? seconds + 'sec' : '') + ' '
}
export const MS2PeriodS = (cms: number) => {
  // let seconds = Math.floor(cms / 1000);
  let seconds = cms;
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24)
  let months = Math.floor(days / 30)
  seconds = Math.floor(seconds % 60);
  minutes = minutes % 60;
  hours = hours % 24;
  days = days % 30
  return (months > 0 ? months + 'm' : '') + ' ' +  
    (days > 0? (days + 'D') : '') + ' ' + 
    (hours > 0? (hours + 'h') : '') + ' ' +
    (minutes > 0 ? (minutes + 'm') : '') + ' ' +
    (seconds > 0 ? seconds + 's' : '') + ' '
}
export const getBackgroundUrl = (url: string) => {
  return url == "default" ? DEFAULT_COLLECTION_IMG : `${process.env.API_SERVER}/image${url}`
}

export const downloadFile = ({ data, fileName, fileType } : {data: any, fileName: string, fileType: string}) => {
  const blob = new Blob([data], { type: fileType })
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}
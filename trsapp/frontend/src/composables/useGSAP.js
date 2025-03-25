// composables/useGSAP.js として作成すると再利用しやすい
import { ref } from 'vue'

const loadScript = (src, integrity) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.integrity = integrity
    script.crossOrigin = "anonymous"
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export function useGSAP() {
  const isGsapLoaded = ref(false)
  
  const loadGSAP = () => {
    const gsapSrc = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js'
    const gsapIntegrity = "sha512-f6bQMg6nkSRw/xfHw5BCbISe/dJjXrVGfz9BSDwhZtiErHwk7ifbmBEtF9vFW8UNIQPhV2uEFVyI/UHob9r7Cw=="
    
    // plugins
    const ScrollTriggerSrc = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js"
    const ScrollTriggerIntegrity = "sha512-AcqPGqrrAEtEwe+ADO5R8RbdFi7tuU7b/A2cJJH0Im0D18NRk5p5s4B3E5PMuO81KFw0ClN7J5SHVUJz7KOb0A=="

    return new Promise((resolve) => {
      if (window.gsap) {
        // 既にロード済みの場合
        isGsapLoaded.value = true
        resolve(window.gsap)
        return
      }
      
      //コア読み込み
      loadScript(gsapSrc, gsapIntegrity)
        .then(() => {
          //プラグイン読み込み
          return loadScript(ScrollTriggerSrc, ScrollTriggerIntegrity)
        })
        .then(() => {
          isGsapLoaded.value = true
          resolve(window.gsap)
        })
        .catch(error => {
          console.error('GSAPの読み込みに失敗しました:', error)
        })
    })
  }
  
  return {
    isGsapLoaded,
    loadGSAP
  }
}
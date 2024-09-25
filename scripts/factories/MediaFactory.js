export class MediaFactory {
    constructor(media){
        this._media = media
    }

    createMedia() {
        let mediaElement

        if(this._media.image){
            mediaElement = this.createImage()
        } else if (this._media.video){
            mediaElement = this.createVideo()
        }else {
            console.error('media unfound')
        }
        return mediaElement
    }
    
    createImage() {
        const img = document.createElement('img')
        img.setAttribute('src', `assets/media/${this._media.image}`)
        img.setAttribute('alt', this._media.title)
        return img
    }
    
    createVideo() {
        const video = document.createElement('video')
        video.setAttribute('src',`assets/media/${this._media.video}`)
        video.setAttribute('controls','true')
        return video
    }


}
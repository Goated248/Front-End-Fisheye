export function sortMedia(mediaList,sortOption) {
    if (sortOption === 'date') {
        return mediaList.sort((a,b)=> new Date(b.date) - new Date(a.date))
    } else if (sortOption === 'likes') {
        return mediaList.sort((a,b)=> b.likes - a.likes)
    }else if (sortOption === 'title') {
        return mediaList.sort((a,b)=> a.title.localeCompare(b.title))
    }
    return mediaList
}
const imageContainer = document.getElementById("image__container")
const loader = document.getElementById("loader")

let isReady = false
let imagesLoadedAmount = 0
let totalImgs = 0
let photosArray = []

// unsplash Api
const count = 1
const apiKey = "xkKEoXdM-K7bLOjJdwFzymacOFcSmcke1TQd_6DINpA"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check amount of vehicle loaded
const imageLoaded = () => {
    imagesLoadedAmount++
    if(imagesLoadedAmount === totalImgs) {
        isReady = true
        loader.hidden = true
    }
}

//Helper function setAttribute function 
function setAttributes(element, attributes) {
    for(key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Links and Photos. Add to DOM
function displayPhotos() {
    console.log('Hello')
    
    imagesLoadedAmount = 0
    totalImgs = photosArray.length
    console.log(totalImgs)

    photosArray.forEach((photo) => {
        console.log(photo)
        // link
        const anchor = document.createElement("a")
        setAttributes(anchor, {
            href: photo.links.html,
            target: '_blank'
        })
        anchor.setAttribute("target", '_blank')
        // image
        const img = document.createElement("img")
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // put img inside the anchor
        anchor.appendChild(img)
        imageContainer.appendChild(anchor)
        console.log(imageContainer)

        img.addEventListener("load", imageLoaded)
    })
} 

displayPhotos()

// Get photos from unsplash api
async function getPhotos() {
    try {
        const respone = await fetch(apiUrl)
        photosArray = await respone.json()
        displayPhotos()
    }
    catch (error) {
        // console.log(error)
    }
}

// 
window.addEventListener("scroll", () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && isReady) {
        isReady = false
        getPhotos()
        console.log("load more")
    }
})

getPhotos()
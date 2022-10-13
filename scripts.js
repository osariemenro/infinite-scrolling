const imageContainer = document.getElementById("image__container")
const loader = document.getElementById("loader")

let photosArray = []

// unsplash Api
const count = 5
const apiKey = "xkKEoXdM-K7bLOjJdwFzymacOFcSmcke1TQd_6DINpA"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Helper function setAttribute function 
function setAttributes(element, attributes) {
    for(key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Links and Photos. Add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
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
    })
} 

// Get photos from unsplash api
async function getPhotos() {
    try {
        const respone = await fetch(apiUrl)
        photosArray = await respone.json()
        displayPhotos()
    }
    catch (error) {
        console.log(error)
    }
}

// 
window.addEventListener("scroll", () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) {
        getPhotos()
        console.log("load more")
    }
})

getPhotos()
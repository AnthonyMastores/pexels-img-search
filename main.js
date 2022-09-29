const next = document.querySelector(".next")
const input = document.querySelector("input")
const searchbutton = document.querySelector(".searchbutton")

let pagenr = 1
let search = false
let query = ""

input.addEventListener("input",(e) => {
    e.preventDefault()
    query = e.target.value
})

async function CuratedPhotos(pagenr) {
    const data = await fetch(
        `https://api.pexels.com/v1/curated?per_page=10&page=${pagenr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "563492ad6f91700001000001600ac8a9d73b45a3816e9904cf0654b1"
            },
        }
    )
    const result = await data.json()
    result.photos.forEach((photo) => {
        const pic = document.createElement("div")
        pic.innerHTML = `<img src=${photo.src.large}        >
            <p>Photo: ${photo.photographer}</p>
        <a href= ${photo.src.large}>Enlarge</a>
        `
        document.querySelector(".gallery").appendChild(pic)
    })  
}


async function SearchPhotos(query,pagenr) {
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${pagenr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "563492ad6f91700001000001600ac8a9d73b45a3816e9904cf0654b1"
            },
        }
    )
    const result = await data.json()
    result.photos.forEach((photo) => {
        const pic = document.createElement("div")
        pic.innerHTML = `<img src=${photo.src.large}        >
            <p>Photo: ${photo.photographer}</p>
        <a href= ${photo.src.large}>Enlarge</a>
        `
        document.querySelector(".gallery").appendChild(pic)
    })  
}


searchbutton.addEventListener("click", () => {
    if (input.value == "") return
    clear()
    search = true
    SearchPhotos(query,pagenr)
    pagenr ++
})
function clear() {
    input.value =""
    document.querySelector(".gallery").innerHTML = ""
    pagenr = 1
}


next.addEventListener("click", ()=> {
    if (!search){
        pagenr ++
        CuratedPhotos(pagenr)
    }else {
        if (query.value == ""){
            return
        }
        pagenr++
        SearchPhotos(query,pagenr)
    }
})
CuratedPhotos(pagenr)

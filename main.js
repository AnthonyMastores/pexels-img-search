const next = document.querySelector(".next")
const input = document.querySelector("input")
const searchbutton = document.querySelector(".sbutton")

let pagenr = 1
let search = false
let query = ""

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
            
        <a href= ${photo.src.large} target=_blank>Expand </a>
        `
        document.querySelector(".photos").appendChild(pic)
    }) 
}

function clear() {
    input.value =""
    document.querySelector(".photos").innerHTML = ""
    pagenr = 1
}

input.addEventListener("input",(e) => {
    e.preventDefault()
    query = e.target.value
})

searchbutton.addEventListener("click", () => {
    if (input.value == "") return
    clear()
    search = true
    SearchPhotos(query,pagenr)
    pagenr ++
})

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


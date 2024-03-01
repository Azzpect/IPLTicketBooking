function getSearchContainers(search_item) {
    if(search_item == "") {
        window.location.reload()
        return 
    }
    let containers = Array.from(document.getElementsByClassName("ticket-container"))
    let main_container = document.getElementById("container")
    let matches = containers.map(container => {
        return container.getAttribute("id")
    })
    let found_items = matches.filter(match => {
        return match.includes(search_item)
    })
    found_items.map(item => {
        let match = document.getElementById(item)
        main_container.insertBefore(match, main_container.firstChild)
    }) 
}  

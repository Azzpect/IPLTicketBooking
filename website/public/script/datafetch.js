function openWhatsapp() {
    let msg = {msg: ""}
    fetch("/sendMessage", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    }).then(res => {
        return res.json()
    }).then(whatsappLink => {
        window.open(whatsappLink.link, "_blank")
    }).catch(err => {
        console.log(err)
    })
}
function getSchedule() {
    fetch("/", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    }).then(res => {
        return res.json()
    }).then(schedule => {
        let main_container = document.getElementById("container")
        for(const match of schedule.matches) {
            let team1 = match.match.slice(0, match.match.indexOf("vs.")-1)
            let team2 = match.match.slice( match.match.indexOf("vs.")+4)
            let container = document.createElement("div")
            container.classList.add("ticket-container")
            let logo_container = document.createElement("div")
            logo_container.classList.add("logo-container")
            let team1_logo = document.createElement("img")
            team1_logo.src = `/public/images/${team1}.png`
            let team2_logo = document.createElement("img")
            team2_logo.src = `/public/images/${team2}.png`
            let vs_logo = document.createElement("img")
            vs_logo.src = '/public/images/vs.png'
            team1_logo.classList.add("team-logo")
            team2_logo.classList.add("team-logo")
            vs_logo.classList.add("vs-logo")
            logo_container.appendChild(team1_logo)
            logo_container.appendChild(vs_logo)
            logo_container.appendChild(team2_logo)
            container.appendChild(logo_container)

            let details = document.createElement("div")
            details.classList.add("details")
            let schedule = document.createElement("div")
            schedule.classList.add("schedule")
            let date = document.createElement("p")
            let time = document.createElement("p")
            date.classList.add("date")
            time.classList.add("time")
            date.textContent = match.date
            time.textContent = match.time
            schedule.appendChild(date)
            schedule.appendChild(time)
            details.appendChild(schedule)
            let msg = document.createElement("div")
            msg.classList.add("msg")
            let button = document.createElement("button")
            button.classList.add("whatsapp")
            button.appendChild(document.createTextNode("Enquire on "))


            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("style", "fill: rgba(0, 0, 0, 1);");

            // Create path element inside SVG
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill-rule", "evenodd");
            path.setAttribute("clip-rule", "evenodd");
            path.setAttribute("d", "M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263");
            svg.appendChild(path);

            // Add SVG to button
            button.appendChild(svg);

            // Add text to button
            let stock = document.createElement("p")
            stock.classList.add("stock")
            stock.textContent = "Stock: Few in Stock"
            msg.appendChild(button)
            msg.appendChild(stock)
            details.appendChild(msg)
            container.appendChild(details)

            main_container.appendChild(container)



            let btn_arr = Array.from(document.getElementsByClassName("whatsapp"))
            for(const btn of btn_arr) {
                btn.addEventListener("click", e => {
                    openWhatsapp()
                })
            }
        }
    }).catch(err => {
        console.log(err)
    })
}
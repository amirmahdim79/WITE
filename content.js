// Function to find and change the target element
async function changeElement() {
    let iframe = document.getElementById('webpack-dev-server-client-overlay')
    let iframeD = iframe?.contentDocument || iframe?.contentWindow.document
    let error = iframeD.getElementById("webpack-dev-server-client-overlay-div")

    const errorText = error.textContent

    var btn = document.createElement('button')
    btn.textContent = "Click for AI Solution🧠"
    error.appendChild(btn)
    btn.setAttribute('style', 'padding: 6px 12px; border-radius: 25px; margin: 12px;')

    btn.addEventListener("click", async function() {
        let title = document.createElement('span')
        error.appendChild(title)
        title.innerHTML = "Here is the solution:"
        title.setAttribute('style', 'padding-top: 24px;')

        let solutionDiv = document.createElement('div')
        solutionDiv.setAttribute('style', 'line-height: 32px; background-color: rgb(87, 151, 255, 0.1); color: rgb(252, 207, 207); padding: 1rem 1rem 1.5rem;')
        error.appendChild(solutionDiv)

        btn.style.display = 'none'

        let prompt = errorText + ". if applicable five me the correct code sample for it"

        const eventSource = new EventSource(`http://91.121.232.98:8888/api/gpt/search?query=${prompt}`);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            solutionDiv.textContent += `${data}`;
        };

        eventSource.onerror = (error) => {
            eventSource.close();
        };
    });
}
  
changeElement()
  
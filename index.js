// Hide the parameter box initially
let parametersBox = document.getElementById("parametersBox");
let requestJsonBox = document.getElementById("requestJsonBox");

let contType = document.getElementById("contType");
let get = document.getElementById("get")
let post = document.getElementById("post")


get.addEventListener("click", () => {

    contType.style.display = "none";
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "none";

});
post.addEventListener("click", () => {

    requestJsonBox.style.display = "block";
    contType.style.display = "block";
})

parametersBox.style.display = "none";
contType.style.display = "none";
requestJsonBox.style.display = "none";//DOM m torahega pr space nahi occupy karega

//initialise no. of params
let addedParamCount = 0;

//utility functions
//1) utility function to get DOM element from string.
function getDOMElementFromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;

    return div.firstElementChild;
}

// If the user checks paramsradio, hide jsonbox

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", (e) => {

    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";


})
//if the user checks jsonradio, hide params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", (e) => {

    requestJsonBox.style.display = "block";
    parametersBox.style.display = "none";


})
//ifthe user clicks on + button , add moreparameters

let addParam = document.getElementById("addParam");

addParam.addEventListener("click", () => {
    params = document.getElementById("params");

    string = `
            <div class="form-row">
                <label for="" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                </div>
                <div class="col-md-4 my-1">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                </div>
                <button id="addParam" class=" removeParam m-1 btn btn-primary">-</button>
            </div>
      `;

    // Convert element string to dom node
    paramElement = getDOMElementFromString(string);
    params.appendChild(paramElement)

    //add eventListner to delete parameter onclicking - 
    let deleteParam = document.getElementsByClassName("removeParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove()
        })
    }

    addedParamCount++;
})
// if the user clicks on the submit button.
let submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    //show pls wait in response box.
    document.getElementById("responsePrism").innerHTML = `Please Wait....Fetching Response.`;

    // ..fetch all the values user entered

    let url = document.getElementById("url").value;

    //************************************
    let requestType = document.querySelector("input[name='requestType']:checked").value

    let contentType = document.querySelector("input[name='contentType']:checked").value;



    //if the user has chosen params instead of json , collect the params in an object.
    if (contentType == "params") {
        data = {};

        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }


        }
        data = JSON.stringify(data);



    }
    else {
        data = document.getElementById("requestJsonText").value;
    }


    //console all the values for debugging.
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    if (requestType == "GET") {
        fetch(url, {
            method: "GET"
        }).then(response => response.text()).then(data => {
            console.log(data);
            document.getElementById("responsePrism").innerHTML = data

        })
    }
    else {

        fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data,
        }).then(response => response.text()).then(data => { document.getElementById("responsePrism").innerHTML = data })
    }
})


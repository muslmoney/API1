const APIUrl = `https://jsonplaceholder.typicode.com`

const RequesGet = async (path = "") =>{
    path = APIUrl + path 
    return await fetch(path)
   .then(response => response.json())
}


const RequestPost =  async (path, data) =>{
    path = APIUrl + path
    return await fetch(path, {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json())
}

const RequesDelete = async (path = '') =>{
    path = APIUrl + path 
    return await fetch(path,{
        method:'DELETE',
        headers: {
                "Content-type": "application/json"}

    }).then(response => response.json())
}


const RequesPatch = async (path, data) =>{
    return await fetch (path,{
        method:'PATCH',
        body: JSON.stringify(data),
    })
}
window.addEventListener('DOMContentLoaded' , () => {
    const container = document.querySelector('#table tbody')
    const userName = document.querySelector('#user-name')
    const userId = document.querySelector('#user-id')
    const postBtn = document.querySelector('#post')
    const deleteBtn = document.querySelector('#delete')
    const userEmail = document.querySelector('#user-email')
    const userText = document.querySelector('#user-comment')
    container.innerHTML = 'Loading...'
const user = {
    
    name: null,
    "username": "Bret",
    email: undefined,
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": null
    }
  
}


    RequesGet('/users').then(data => {
        container.innerHTML = ''

        data.forEach((element, index) => {
            index += 1  
            container.insertAdjacentHTML('beforeend', `
            <tr>
                <th scope="row">${index}</th>
                    <td>
                    <span>${element.name}</span>
                    <b>${element.username}</b>
                    </td>
                    <td>
                    <a href='mailto:${element.email}' >
                    ${element.email.toLowerCase()}</a>
                    </td>
                    <td>
                    <a href = 'tel:${element.phone}'>
                    ${element.website}</a>
                    ${element.company.name}
                    </td>
                    <td>
                    <button class="btn btn-warning" data-user-id="${element.id}">Patch</button>
                    <button class="btn btn-danger" data-user-id="${element.id}">Delete</button>
                </td>
            </tr>
            `)
        });
    })
    userName.addEventListener('input' , () => {
        user.name = userName.value;
    }) 
    userEmail.addEventListener('input' , () => {
        user.email = userEmail.value;
    })
     userText.addEventListener('input' , () => {
        user.company.bs = userText.value;
    })
    postBtn.addEventListener('click' , () => {
        RequestPost('/users' , user).then(() => {
            alert('POSTED')

        }).catch(error => {
            alert(error?.massage);
            console.error(error);
        })
    })
} ) 
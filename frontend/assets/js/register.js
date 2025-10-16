const register = async (event) => {
    event.preventDefault()

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const profile = document.getElementById("profile").value;

    const req = await fetch('http://localhost:3000/api/register',{
        method:'POST',
        body:JSON.stringify({
            username, email,password,profile
        }),
        headers:{
            'Content-type': 'application/json'
        }
    } );
    const res = await req.json();

    if(req.ok){
        alert(res.msg);
        window.location.replace('index.html');
    } else{
        alert(res.msg)
    }
}


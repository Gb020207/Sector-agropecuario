const login = async (event) =>{
    event.preventDefault();

    const username = document.getElementById("usernameLog").value;
    const password = document.getElementById("passwordLog").value;
    try {
        const req = await fetch('http://localhost:3000/api/login',{
        method: 'POST',
        body: JSON.stringify({
            username,password,
        }),
        headers:{
            'Content-type': 'application/json'
        }
});
 const res = await req.json();

 if(req.ok){
    alert(res.msg);
    localStorage.setItem("token",res.token)
    window.location.replace('index.html')
 } else{
    alert(res.msg);
 }
    } catch (error) {
        console.log(error)
        alert("Error al hacer el  login")
    }
    
} 
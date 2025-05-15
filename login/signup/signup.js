document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const formData = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };
  
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  
    const data = await response.json();
    alert(data.message);
  });
// Hamburger Menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
// Contact Form
document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("contact-form")
  if(form){
    form.addEventListener("submit",  async function(e){
      e.preventDefault()

      const formData = {
        name:this.name.value,
        email: this.email.value,
        message: this.message.value
      }

      try {
        const response = await fetch("https://portfolio-harshita-sharma.vercel.app/",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        })

        const result = await response.json()
        document.getElementById("form-response").innerText = result.message
        this.reset()
      } catch (error){
        document.getElementById("form-response").innerText = "Something went wrong Please try again!";
      }
    })
  }
})
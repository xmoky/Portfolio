//svg
// Mostrar el SVG de carga al cargar la página
document.addEventListener("DOMContentLoaded", function()

{
  setTimeout(borrar_svg,"3000");
  
  });
  
  function borrar_svg()
  {

          document.getElementById("cargaSVG").style.display = "none";
  
  }

  let usuario=document.getElementById("usuario");
  usuario.addEventListener("click",function(){
        window.location.href = "perfil/login.html";
  })
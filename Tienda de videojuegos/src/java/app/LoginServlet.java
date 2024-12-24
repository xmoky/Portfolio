
package app;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "LoginServlet", urlPatterns = {"/loginServlet"})
public class LoginServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String user = request.getParameter("usuario");
            String pass = request.getParameter("pass");

            // Crear una instancia de la clase de conexión
            Conexion conexion = new Conexion();

            try {
                // Verificar las credenciales usando el método de comprobarUsuario
                if (conexion.comprobarUsuario(user, pass)) {
                    // Si las credenciales son válidas, establecer una sesión
                    HttpSession session = request.getSession(true);
                    

                    // Redirigir a diferentes servlets según el rol (admin o usuario)
                    if (conexion.esAdmin(user,pass)==true) { 
                        session.setAttribute("tipoUsuario", "admin");
                        response.sendRedirect("AdminServlet"); // Ajusta el nombre del servlet para administradores
                    } else if(conexion.esAdmin(user,pass)==false){
                        session.setAttribute("tipoUsuario", "usuario");
                        response.sendRedirect("usuarioServlet"); // Ajusta el nombre del servlet para usuarios normales
                    }
                } else {
                    // Si las credenciales no son válidas, mostrar un mensaje de error
                    out.println("Credenciales inválidas. Inténtalo de nuevo.");
                    response.sendRedirect("index.html");
                }
            } catch (Exception e) {
                // Manejar cualquier excepción generada durante la verificación de credenciales
                out.println("Error al verificar las credenciales: " + e.getMessage());
            } finally {
                // Cerrar la conexión después de su uso
                conexion.cerrarConexion();
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // No implementar lógica para el método GET
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String getServletInfo() {
        return "Servlet de inicio de sesión";
    }
}



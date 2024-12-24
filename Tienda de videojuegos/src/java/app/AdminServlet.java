package app;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author Jaime
 */
@WebServlet(name = "AdminServlet", urlPatterns = {"/AdminServlet"})
public class AdminServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession session = request.getSession(false); // No crea una nueva sesión si no existe
        if (session != null) {
            String tipoUsuario = (String) session.getAttribute("tipoUsuario");
            if ("admin".equals(tipoUsuario)) {
                try ( PrintWriter out = response.getWriter()) {
                    
                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<title>Admin</title>");
                    out.println("<link rel=\"stylesheet\" href=\"estilos2.css\"/>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<h1>¿QUE QUIERES HACER?</h1>");
                    out.println("<div><a href='insertaServlet'>Agregar consolas</a></div>");
                    out.println("<div><a href='insertaJuegoServlet'>Agregar videojuegos</a></div>");
                    out.println("<div><a href='borraServlet'>Borrar consolas</a></div>");
                    out.println("<div><a href='borraJuegosServlet'>Borrar videojuegos</a></div>");
                    out.println("<div><a href='cerrarSesion'>Cerrar sesión</a></div>");
                    out.println("</body>");
                    out.println("</html>");
                }
            }else{
                response.sendRedirect("usuarioServlet");
            }
        } else {
            response.sendRedirect("index.html");
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

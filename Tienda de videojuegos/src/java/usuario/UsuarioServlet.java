/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package usuario;

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
@WebServlet(name = "UsuarioServlet", urlPatterns = {"/usuarioServlet"})
public class UsuarioServlet extends HttpServlet {

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
        HttpSession session = request.getSession(false); 
        if (session != null) {
            String tipoUsuario = (String) session.getAttribute("tipoUsuario");
            if ("usuario".equals(tipoUsuario)) {
                try ( PrintWriter out = response.getWriter()) {
                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<link rel='stylesheet' type=\"text/css\" href='estilos2.css'/>");
                    out.println("<title>Usuario</title>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<h1>¿QUE QUIERES HACER?</h1>");
                    out.println("<a href='consultaEspec'>Consultar información sobre las consolas</a>");
                    out.println("<a href='juegosConsolaServlet'>Consultar catálogo de juegos por consola</a>");
                    out.println("<a href='catalogoJuegosServlet'>Consultar todo el catálogo de juegos</a>");
                    out.println("<a href='catalogoProductosServlet'>Mostrar todo el catálogo de productos</a>");
                    out.println("<a href='cerrarSesion'>Cerrar sesión</a>");
                    out.println("</body>");
                    out.println("</html>");
                }
            }else if("admin".equals(tipoUsuario)){
                response.sendRedirect("AdminServlet");
            }
        }else{
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

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package app;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author Jaime
 */
@WebServlet(name = "BorraJuegosServlet", urlPatterns = {"/borraJuegosServlet"})
public class BorraJuegosServlet extends HttpServlet {

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
                    out.println("<link rel=\"stylesheet\" href=\"estilos.css\"/>");
                    out.println("<title>Borrar juegos</title>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<form action='borradodeJuegos' method='post'>\n"
                            + "        <label>Nombre del juego</label>\n"
                            + "        <select name='juego'>");
                    Conexion laConexion = new Conexion();

                    try ( PreparedStatement elStatementPreparado = laConexion.prepareStatement(
                            "SELECT nombreJuego FROM juegos")) {

                        try ( ResultSet elResultado = elStatementPreparado.executeQuery()) {

                            while (elResultado.next()) {
                                String nombreJuego = elResultado.getString("nombreJuego");
                                out.println("<option value=\"" + nombreJuego + "\">" + nombreJuego + "</option>");
                            }
                        }

                        out.println("</select>\n"
                                + "        <button type='submit'>Borrar juego</button>\n"
                                + "    </form>");
                        out.println("</body>");
                        out.println("</html>");
                    }

                } catch (Exception e) {
                    throw new ServletException("Error al comprobar el usuario: " + e.getMessage(), e);
                }
            } else {
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

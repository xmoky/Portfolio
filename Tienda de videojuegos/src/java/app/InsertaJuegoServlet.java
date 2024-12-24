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

/**
 *
 * @author Jaime
 */
@WebServlet(name = "InsertaJuegoServlet", urlPatterns = {"/insertaJuegoServlet"})
public class InsertaJuegoServlet extends HttpServlet {

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
                    /* TODO output your page here. You may use following sample code. */
                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<link rel=\"stylesheet\" href=\"estilos.css\"/>");
                    out.println("<title>Servlet InsertaJuegoServlet</title>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<form action='inserccionJuego' method='post' required>\n"
                            + "        <label>Nombre del juego</label>\n"
                            + "        <input type='text' name='nombreJuego' required>\n"
                            + "        <label>Compañia desarrolladora</label>\n"
                            + "        <input type='text' name='companiaDesarrolladora' required>\n"
                            + "        <label>Genero</label>\n"
                            + "        <input type='text' name='genero' required>\n"
                            + "        <label>Puntuacion de Metacritic</label>\n"
                            + "        <input type='number' name='puntuacionMetacritic' required>\n"
                            + "        <label>Precio</label>\n"
                            + "        <input type='string' name='precio' required>\n"
                            + "        <label>Unidades disponibles</label>\n"
                            + "        <input type='number' name='unidadesDisponibles' required>\n"
                            + "        <label>ID de la consola</label>\n"
                            + "        <input type='number' name='idConsola' required>\n"
                            + "        <button type='submit'>Agregar juego</button>\n"
                            + "    </form>");
                    out.println("</body>");
                    out.println("</html>");
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

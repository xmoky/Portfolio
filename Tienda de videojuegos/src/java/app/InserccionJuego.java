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
@WebServlet(name = "InserccionJuego", urlPatterns = {"/inserccionJuego"})
public class InserccionJuego extends HttpServlet {

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
                    String nombreJuego = request.getParameter("nombreJuego");
                    String companiaDesarrolladora = request.getParameter("companiaDesarrolladora");
                    String genero = request.getParameter("genero");
                    int puntuacionMetacritic = Integer.parseInt(request.getParameter("puntuacionMetacritic"));
                    float precio = Float.parseFloat(request.getParameter("precio"));
                    int unidadesDisponibles = Integer.parseInt(request.getParameter("unidadesDisponibles"));
                    int idConsola = Integer.parseInt(request.getParameter("idConsola"));

                    Conexion miConexion = new Conexion();

                    miConexion.insertarJuego(nombreJuego, companiaDesarrolladora, genero, puntuacionMetacritic, precio, unidadesDisponibles, idConsola);

                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<title>Servlet InserccionJuego</title>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<p>Juego agregado correctamente</p>");
                    out.println("<button><a href=\"insertaJuegoServlet\">Agregar mas juegos</a></button>");
                    out.println("<button><a href=\"AdminServlet\">Menu</a></button>");
                    out.println("</body>");
                    out.println("</html>");
                } catch (Exception e) {
                    e.getMessage();
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

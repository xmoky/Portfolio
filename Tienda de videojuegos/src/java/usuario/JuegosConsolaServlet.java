/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package usuario;

import app.Conexion;
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

@WebServlet(name = "JuegosConsolaServlet", urlPatterns = {"/juegosConsolaServlet"})
public class JuegosConsolaServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession session = request.getSession(false);
        if (session != null) {
            String tipoUsuario = (String) session.getAttribute("tipoUsuario");
            if ("usuario".equals(tipoUsuario)) {
                try ( PrintWriter out = response.getWriter()) {
                    Conexion laConexion = new Conexion();
                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<link rel='stylesheet' type=\"text/css\" href='estilos2.css'/>");
                    out.println("<title>Consulta de consolas</title>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<h1>¿De qué consola quieres ver el catalogo de juegos?</h1>");
                    out.println("<form action='juegosConsola' method='post'>\n"
                            + "        <label>Nombre de la consola</label>\n"
                            + "        <select name='consola'>");
                    try ( PreparedStatement elStatementPreparado = laConexion.prepareStatement(
                            "SELECT nombreConsola FROM consolas")) {

                        try ( ResultSet elResultado = elStatementPreparado.executeQuery()) {

                            while (elResultado.next()) {
                                String nombreConsola = elResultado.getString("nombreConsola");
                                out.println("<option value=\"" + nombreConsola + "\">" + nombreConsola + "</option>");
                            }
                        }
                    }
                    out.println("</select>\n"
                            + "        <button type='submit'>Ver catálogo de juegos</button>\n"
                            + "    </form>");
                    out.println("</body>");
                    out.println("</html>");
                } catch (Exception e) {
                    throw new ServletException("Error: " + e.getMessage(), e);
                }
            } else if ("admin".equals(tipoUsuario)) {
                response.sendRedirect("AdminServlet");
            }
        } else {
            response.sendRedirect("index.html");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}

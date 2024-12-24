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

/**
 *
 * @author Jaime
 */
@WebServlet(name = "ConsultaEspec", urlPatterns = {"/consultaEspec"})
public class ConsultaEspec extends HttpServlet {

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
                    Conexion miConexion = new Conexion();
                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<link rel=\"stylesheet\" href=\"estilos2.css\"/>");
                    out.println("<title>Consulta Especificaciones</title>");
                    out.println("</head>");
                    out.println("<body>");
                    out.println("<h1>ESPECIFICACIONES</h1>");

                    out.println("<table>");
                    out.println("<th>Nombre de la consola</th><th>Potencia de la CPU</th><th>Potencia de la GPU</th><th>Compañia</th><th>Precio</th><th>Unidades disponibles</th><th>Comprar</th>");
                    try ( PreparedStatement elStatementPreparado = miConexion.prepareStatement(
                            "SELECT * FROM consolas")) {

                        try ( ResultSet elResultado = elStatementPreparado.executeQuery()) {

                            while (elResultado.next()) {
                                String idConsola = elResultado.getString("idConsola");
                                String nombreConsola = elResultado.getString("nombreConsola");
                                String potenciaCPU = elResultado.getString("potenciaCPU");
                                String potenciaGPU = elResultado.getString("potenciaGPU");
                                String compania = elResultado.getString("compania");
                                String precioStr = elResultado.getString("precio");
                                float precio = Float.parseFloat(precioStr);
                                String unidadesDisponiblesStr = elResultado.getString("unidadesDisponibles");
                                int unidadesDisponibles = Integer.parseInt(unidadesDisponiblesStr);
                                out.println("<form action='compraConsolas' method='post'>");
                                out.println("<tr>"
                                        + "<td>" + nombreConsola + "</td>"
                                        + "<td>" + potenciaCPU + "</td>"
                                        + "<td>" + potenciaGPU + "</td>"
                                        + "<td>" + compania + "</td>"
                                        + "<td>" + precio + "</td>"
                                        + "<td>" + unidadesDisponibles + "</td>"
                                        + "<td><input type='hidden' name='idConsola' value=" + idConsola + ">"
                                        + "<button type='submit' name='accion' value='comprar'>Comprar</button></td>"
                                        + "</tr>");
                                out.println("</form>");
                            }
                        }
                    }
                    out.println("</table>");

                    out.println("</body>");
                    out.println("</html>");
                } catch (Exception e) {
                    e.getMessage();
                }
            } else if ("admin".equals(tipoUsuario)) {
                response.sendRedirect("AdminServlet");
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

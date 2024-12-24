/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package app;

/**
 *
 * @author Jaime
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Conexion {

    protected Connection laConexion;

    public Conexion() throws Exception {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.laConexion = DriverManager.getConnection("jdbc:mysql://localhost:8889/entretenimiento", "root", "root");
        } catch (ClassNotFoundException | SQLException e) {
            throw new Exception("Error al conectar a la base de datos: " + e.getMessage());
        }
    }

    public boolean comprobarUsuario(String username, String pass) throws Exception {
        
        try ( PreparedStatement elStatementPreparado = laConexion.prepareStatement(
                "SELECT * FROM usuarios WHERE nombreUsuario=? AND contrasena=?")) {
            elStatementPreparado.setString(1, username);
            elStatementPreparado.setString(2, pass);

            try ( ResultSet elResultado = elStatementPreparado.executeQuery()) {
                // Verifica si hay al menos una fila en el resultado
                return elResultado.next();
            }
        } catch (Exception e) {
            throw new Exception("Error al comprobar el usuario: " + e.getMessage());
        }
    }

    public boolean esAdmin(String username, String pass) throws Exception {
        try ( PreparedStatement statement = laConexion.prepareStatement(
                "SELECT esAdmin FROM Usuarios WHERE nombreUsuario = ? and contrasena=?")) {
            statement.setString(1, username);
            statement.setString(2, pass);
            try ( ResultSet resultSet = statement.executeQuery()) {
                // Verificar si hay al menos una fila en el resultado
                if (resultSet.next()) {
                    // Acceder al valor de la columna "esAdmin"
                    boolean esAdmin = resultSet.getBoolean("esAdmin");
                    return esAdmin;
                } else {
                    // No hay resultados, el usuario no es admin
                    return false;
                }
            }
        } catch (SQLException e) {
            throw new Exception("Error al verificar si es admin: " + e.getMessage());
        }
    }

    public void insertarConsola(String nombreConsola, String potenciaCPU, String potenciaGPU, String compania, float precio, int unidadesDisponibles) throws Exception {
        try ( PreparedStatement statement = laConexion.prepareStatement(
                "INSERT INTO consolas (nombreConsola, potenciaCPU, potenciaGPU, compania, precio, unidadesDisponibles) VALUES (?, ?, ?, ?, ?, ?)")) {
            statement.setString(1, nombreConsola);
            statement.setString(2, potenciaCPU);
            statement.setString(3, potenciaGPU);
            statement.setString(4, compania);
            statement.setFloat(5, precio);
            statement.setInt(6, unidadesDisponibles);

            // Ejecutar la consulta de inserción
            int filasAfectadas = statement.executeUpdate();

            // Verificar si se insertó al menos una fila con éxito
            if (filasAfectadas > 0) {
                System.out.println("Inserción exitosa");
            } else {
                System.out.println("No se insertaron filas");
            }
        } catch (SQLException e) {
            throw new Exception("Error al insertar consola: " + e.getMessage());
        }
    }
    
    public void insertarJuego(String nombreJuego, String companiaDesarrolladora, String genero, int puntuacionMetacritic, float precio, int unidadesDisponibles,int idConsola) throws Exception {
        try ( PreparedStatement statement = laConexion.prepareStatement(
                "INSERT INTO juegos (nombreJuego, companiaDesarrolladora, genero, puntuacionMetacritic, precio, unidadesDisponibles,idConsola) VALUES (?, ?, ?, ?, ?, ?, ?)")) {
            statement.setString(1, nombreJuego);
            statement.setString(2, companiaDesarrolladora);
            statement.setString(3, genero);
            statement.setInt(4, puntuacionMetacritic);
            statement.setFloat(5, precio);
            statement.setInt(6, unidadesDisponibles);
            statement.setInt(7,idConsola);

            // Ejecutar la consulta de inserción
            int filasAfectadas = statement.executeUpdate();

            // Verificar si se insertó al menos una fila con éxito
            if (filasAfectadas > 0) {
                System.out.println("Inserción exitosa");
            } else {
                System.out.println("No se insertaron filas");
            }
        } catch (SQLException e) {
            throw new Exception("Error al insertar consola: " + e.getMessage());
        }
    }

    public void borrarConsola(String nombreConsola) throws Exception {
        try ( PreparedStatement statement = laConexion.prepareStatement(
                "DELETE from consolas where nombreConsola like ?")) {
            statement.setString(1, nombreConsola);

            // Ejecutar la consulta de borrado
            int filasAfectadas = statement.executeUpdate();

            // Verificar si se insertó al menos una fila con éxito
            if (filasAfectadas > 0) {
                System.out.println("Borrado exitoso");
            } else {
                System.out.println("No se borro consola");
            }
        } catch (SQLException e) {
            throw new Exception("Error al borrar consola: " + e.getMessage());
        }
    }
    
    public void borrarJuego(String nombreJuego) throws Exception {
        try ( PreparedStatement statement = laConexion.prepareStatement(
                "DELETE from juegos where nombreJuego like ?")) {
            statement.setString(1, nombreJuego);

            
            int filasAfectadas = statement.executeUpdate();

            
            if (filasAfectadas > 0) {
                System.out.println("Borrado exitoso");
            } else {
                System.out.println("No se borro");
            }
        } catch (SQLException e) {
            throw new Exception("Error al borrar juego: " + e.getMessage());
        }
    }
    
    //resta una unidad a las consolas
    public void restaUnidad(int id) throws Exception{
       try ( PreparedStatement statement = laConexion.prepareStatement(
                "UPDATE consolas SET unidadesDisponibles = unidadesDisponibles - 1 WHERE idConsola = ?")) {
            statement.setInt(1, id);

            
            int filasAfectadas = statement.executeUpdate();

            
            if (filasAfectadas > 0) {
                System.out.println("Actualización exitosa");
            } else {
                System.out.println("No se actualizó");
            }
        } catch (SQLException e) {
            throw new Exception("Error al actualizar: " + e.getMessage());
        } 
    }
    
    public void restaUnidadjuego(int id) throws Exception{
       try ( PreparedStatement statement = laConexion.prepareStatement(
                "UPDATE juegos SET unidadesDisponibles = unidadesDisponibles - 1 WHERE idJuego = ?")) {
            statement.setInt(1, id);

            
            int filasAfectadas = statement.executeUpdate();

            
            if (filasAfectadas > 0) {
                System.out.println("Actualización exitosa");
            } else {
                System.out.println("No se actualizó");
            }
        } catch (SQLException e) {
            throw new Exception("Error al actualizar: " + e.getMessage());
        } 
    }
    
    public PreparedStatement prepareStatement(String sql) throws SQLException {
        return laConexion.prepareStatement(sql);
    }

    // Cierra la conexión cuando ya no sea necesaria
    public void cerrarConexion() throws Exception {
        try {
            if (laConexion != null && !laConexion.isClosed()) {
                laConexion.close();
            }
        } catch (SQLException e) {
            throw new Exception("Error al cerrar la conexión: " + e.getMessage());
        }
    }
}

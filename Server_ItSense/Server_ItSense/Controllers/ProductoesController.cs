using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server_ItSense.Models;

namespace Server_ItSense.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoesController : ControllerBase
    {
        private readonly ConnectionContext _context;

        public ProductoesController(ConnectionContext context)
        {
            _context = context;
        }

        // GET: api/Productoes
        [HttpGet]
        [Authorize] // Requiere autenticación para acceder a la lista de productos
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        // GET: api/Productoes/5
        [HttpGet("{id}")]
        [Authorize] // Requiere autenticación para acceder a un producto específico
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            return producto;
        }

        // GET: api/Productoes/AvailableProducts
        [HttpGet("AvailableProducts")]
        [Authorize] // Requiere autenticación para acceder a la lista de productos disponibles
        public async Task<ActionResult<IEnumerable<Producto>>> GetAvailableProducts()
        {
            var availableProducts = await _context.Productos.Where(p => p.Estado).ToListAsync();
            return availableProducts;
        }

        // GET: api/Productoes/UnavailableProducts
        [HttpGet("UnavailableProducts")]
        [Authorize] // Requiere autenticación para acceder a la lista de productos no disponibles
        public async Task<ActionResult<IEnumerable<Producto>>> GetUnavailableProducts()
        {
            var unavailableProducts = await _context.Productos.Where(p => !p.Estado).ToListAsync();
            return unavailableProducts;
        }

        // GET: api/Productoes/DefectiveProducts
        [HttpGet("DefectiveProducts")]
        [Authorize] // Requiere autenticación para acceder a la lista de productos defectuosos
        public async Task<ActionResult<IEnumerable<Producto>>> GetDefectiveProducts()
        {
            var defectiveProducts = await _context.Productos.Where(p => p.Defecto).ToListAsync();
            return defectiveProducts;
        }

        // GET: api/Productoes/NonDefectiveProducts
        [HttpGet("NonDefectiveProducts")]
        [Authorize] // Requiere autenticación para acceder a la lista de productos no defectuosos
        public async Task<ActionResult<IEnumerable<Producto>>> GetNonDefectiveProducts()
        {
            var nonDefectiveProducts = await _context.Productos.Where(p => !p.Defecto).ToListAsync();
            return nonDefectiveProducts;
        }

        // PUT: api/Productoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            producto.Estado = false;
            producto.FechaSalida = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Productoes/bulk
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("bulk")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Producto>>> PostProductos(IEnumerable<Producto> productos)
        {
            foreach (var producto in productos)
            {
                producto.Defecto = true;
            }

            _context.Productos.AddRange(productos);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductos), productos);
        }

        // DELETE: api/Productoes/5
        [HttpDelete("{id}")]
        [Authorize] // Requiere autenticación para eliminar un producto
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
